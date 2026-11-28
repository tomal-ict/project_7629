import axios from 'axios';
import { encryptPayload, decryptPayload } from './crypto';

// Dynamic API Base URL detection that adapts automatically to any host or subdirectory
export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    let path = window.location.pathname;

    // Remove file name if present (e.g., index.html)
    path = path.replace(/\/[^/]+\.[^/]+$/, '');

    // Trim trailing slash
    path = path.replace(/\/+$/, '');

    // If served from a subdirectory (e.g. /1_AGM/project_7629), append /api
    return `${origin}${path}/api`;
  }

  return '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Encrypted': '1', // Signals backend to encrypt outgoing responses
  },
  timeout: 30000,
});

// Request Interceptor: Attach Auth Token and Encrypt Body Payloads
api.interceptors.request.use(
  (config) => {
    // Dynamically update baseURL if window location shifted
    config.baseURL = getApiBaseUrl();

    // Attach Bearer token
    const token = localStorage.getItem('abc_admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Skip encryption for FormData (multipart file uploads)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      return config;
    }

    // Encrypt request body for mutation methods (POST, PUT, PATCH)
    const method = (config.method || '').toLowerCase();
    if (['post', 'put', 'patch'].includes(method) && config.data) {
      try {
        const encrypted = encryptPayload(config.data);
        config.data = encrypted;
        config.headers['X-Encrypted-Payload'] = '1';
      } catch (err) {
        console.warn('Could not encrypt payload, sending standard body:', err);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically Decrypt Encrypted Payloads
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data && data.encrypted && data.payload && data.iv && data.mac) {
      try {
        const decrypted = decryptPayload(data.payload, data.iv, data.mac);
        response.data = decrypted;
      } catch (err) {
        console.error('Failed to decrypt server response:', err);
      }
    }
    return response;
  },
  (error) => {
    // If server returned an encrypted error
    if (error.response && error.response.data && error.response.data.encrypted) {
      try {
        const { payload, iv, mac } = error.response.data;
        error.response.data = decryptPayload(payload, iv, mac);
      } catch (err) {
        console.error('Failed to decrypt error response:', err);
      }
    }

    // Handle token expiration
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined' && window.location.hash.includes('/admin')) {
        localStorage.removeItem('abc_admin_token');
        localStorage.removeItem('abc_admin_user');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
