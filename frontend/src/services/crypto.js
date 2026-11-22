import CryptoJS from 'crypto-js';

// Pre-shared API encryption secret (mirrors backend API_SECRET_KEY / APP_KEY fallback)
const API_SECRET = import.meta.env.VITE_API_SECRET_KEY || 'ABC_AI_System_Secret_Key_2026_Enterprise_Secure';

// Derive 256-bit encryption key using SHA-256
const getDerivedKey = () => {
  return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(API_SECRET));
};

/**
 * Encrypt request data into AES-256-CBC payload with HMAC-SHA256 signature
 */
export const encryptPayload = (data) => {
  try {
    const key = getDerivedKey();
    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const ciphertext = encrypted.ciphertext;

    // HMAC computed over binary IV + Ciphertext
    const combined = iv.clone().concat(ciphertext);
    const mac = CryptoJS.HmacSHA256(combined, key).toString(CryptoJS.enc.Hex);

    return {
      encrypted: true,
      payload: CryptoJS.enc.Base64.stringify(ciphertext),
      iv: CryptoJS.enc.Base64.stringify(iv),
      mac: mac,
    };
  } catch (error) {
    console.error('Payload encryption failed:', error);
    throw error;
  }
};

/**
 * Decrypt incoming encrypted response payload and verify HMAC
 */
export const decryptPayload = (payloadBase64, ivBase64, mac) => {
  try {
    const key = getDerivedKey();
    const ciphertext = CryptoJS.enc.Base64.parse(payloadBase64);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    // Verify HMAC integrity
    const combined = iv.clone().concat(ciphertext);
    const expectedMac = CryptoJS.HmacSHA256(combined, key).toString(CryptoJS.enc.Hex);

    if (expectedMac.toLowerCase() !== String(mac).toLowerCase()) {
      throw new Error('HMAC signature verification failed: payload may have been tampered with.');
    }

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    if (!plaintext) {
      throw new Error('Empty decrypted payload.');
    }

    try {
      return JSON.parse(plaintext);
    } catch {
      return plaintext;
    }
  } catch (error) {
    console.error('Payload decryption failed:', error);
    throw error;
  }
};
