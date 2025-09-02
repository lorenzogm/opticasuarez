import crypto from 'crypto';

/**
 * Generate HMAC-SHA256 signature for Redsys payments
 * @param merchantParameters Base64 encoded merchant parameters
 * @param order Order number
 * @param secretKey Redsys secret key (API token)
 * @returns Generated signature
 */
export function generateRedsysSignature(
  merchantParameters: string,
  order: string,
  secretKey: string
): string {
  // Decode the secret key from base64
  const keyBuffer = Buffer.from(secretKey, 'base64');
  
  // Use the order as the key to create 3DES key derivation
  // Pad order to 8-byte boundary for 3DES
  const paddedOrder = order.padEnd(Math.ceil(order.length / 8) * 8, '\0');
  
  // Create cipher for 3DES-CBC encryption
  const cipher = crypto.createCipheriv('des-ede3-cbc', keyBuffer.subarray(0, 24), Buffer.alloc(8, 0));
  cipher.setAutoPadding(false);
  
  let key = cipher.update(paddedOrder, 'utf8');
  key = Buffer.concat([key, cipher.final()]);
  
  // Generate HMAC-SHA256 signature
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(merchantParameters, 'utf8');
  const signature = hmac.digest('base64');
  
  return signature;
}

/**
 * Get Redsys configuration based on environment
 */
export function getRedsysConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    merchantCode: isProduction ? process.env.REDSYS_MERCHANT_CODE || '999008881' : '999008881',
    terminal: '001',
    currency: '978', // EUR
    transactionType: '0', // Authorization
    endpoint: isProduction 
      ? 'https://sis.redsys.es/sis/realizarPago' // Production endpoint
      : 'https://sis-t.redsys.es:25443/sis/realizarPago', // Test endpoint
    secretKey: process.env.REDSYS_API_TOKEN || '',
  };
}