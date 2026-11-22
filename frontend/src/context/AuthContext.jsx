import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('abc_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('abc_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data && res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('abc_admin_user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.warn('Session verification failed, resetting auth state:', err);
        setToken(null);
        setUser(null);
        localStorage.removeItem('abc_admin_token');
        localStorage.removeItem('abc_admin_user');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data && res.data.success) {
      const { token: newToken, user: newUser } = res.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('abc_admin_token', newToken);
      localStorage.setItem('abc_admin_user', JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, message: res.data?.message || 'Login failed' };
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Continue client cleanup even if network request fails
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('abc_admin_token');
      localStorage.removeItem('abc_admin_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
