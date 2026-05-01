"use server";

// We use dynamic require or internal usage to prevent client-side bundling issues
// although "use server" should handle this, some bundlers are finicky.

const getEncryptionKey = () => {
  const hex = process.env.ENCRYPTION_KEY || '0'.repeat(64);
  return Buffer.from(hex, 'hex');
};

/**
 * AES-256-GCM Encryption
 */
export async function encrypt(text) {
  if (!text) return text;
  const crypto = await import('crypto');
  try {
    const iv = crypto.randomBytes(12);
    const key = getEncryptionKey();
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
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
 */
export async function decrypt(encryptedData) {
  if (!encryptedData || !encryptedData.includes(':')) return encryptedData;
  const crypto = await import('crypto');
  try {
    const [ivHex, tagHex, content] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const key = getEncryptionKey();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    
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
 * Secure Token Generation
 */
export async function generateTokens(payload) {
  const jwt = await import('jsonwebtoken');
  const secret = process.env.JWT_SECRET || 'test_secret_change_me';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'test_refresh_secret_change_me';
  
  const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
}

/**
 * Robust Input Validation
 */
export async function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
