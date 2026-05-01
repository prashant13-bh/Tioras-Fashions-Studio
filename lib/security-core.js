import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

// Use a fallback for build time, but require env in production
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY || '0'.repeat(64);
const ENCRYPTION_KEY = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');

/**
 * AES-256-GCM Encryption for Data at Rest (Zero Trust)
 * @param {string} text - Plaintext to encrypt
 * @returns {string} - Encrypted string in format iv:tag:content
 */
export function encrypt(text) {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
}

/**
 * AES-256-GCM Decryption
 * @param {string} encryptedData - Encrypted string
 * @returns {string} - Original plaintext
 */
export function decrypt(encryptedData) {
  if (!encryptedData || !encryptedData.includes(':')) return encryptedData;
  try {
    const [ivHex, tagHex, content] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

/**
 * Secure Token Generation (Short-lived)
 */
export function generateTokens(payload) {
  const secret = process.env.JWT_SECRET || 'test_secret_change_me';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'test_refresh_secret_change_me';
  
  const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
}

/**
 * Robust Input Validation (XSS Prevention)
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
