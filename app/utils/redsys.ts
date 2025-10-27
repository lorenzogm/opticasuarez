import crypto from 'crypto';

/**
 * Generate HMAC-SHA256 signature for Redsys payments following Redsys specification
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
  try {
    // Decode the secret key from base64
    const keyBuffer = Buffer.from(secretKey, 'base64');
    
    // Ensure we have exactly 24 bytes for 3DES
    if (keyBuffer.length !== 24) {
      throw new Error(`Invalid secret key length: expected 24 bytes, got ${keyBuffer.length}`);
    }
    
    // Use the order as the key to create 3DES key derivation
    // Pad order to 8-byte boundary for 3DES
    const paddedOrder = order.padEnd(Math.ceil(order.length / 8) * 8, '\0');
    
    // Create cipher for 3DES-CBC encryption
    const cipher = crypto.createCipheriv('des-ede3-cbc', keyBuffer, Buffer.alloc(8, 0));
    cipher.setAutoPadding(false);
    
    let key = cipher.update(paddedOrder, 'utf8');
    key = Buffer.concat([key, cipher.final()]);
    
    // Generate HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(merchantParameters, 'utf8');
    const signature = hmac.digest('base64');
    
    return signature;
  } catch (error) {
    console.error('Error generating Redsys signature:', error);
    throw error;
  }
}

/**
 * Create merchant parameters with proper Base64 encoding
 */
export function createMerchantParameters(params: Record<string, string | number>): string {
  const jsonString = JSON.stringify(params);
  return Buffer.from(jsonString, 'utf8').toString('base64');
}

/**
 * Get Redsys configuration based on environment
 */
export function getRedsysConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Get secret key with validation
  const secretKey = process.env.REDSYS_API_TOKEN;
  if (!secretKey || secretKey.trim() === '') {
    throw new Error('REDSYS_API_TOKEN environment variable is required but not set');
  }
  
  // Validate base64 format of secret key
  try {
    Buffer.from(secretKey, 'base64');
  } catch (error) {
    throw new Error('REDSYS_API_TOKEN must be a valid base64-encoded string');
  }
  
  const merchantCode = isProduction ? process.env.REDSYS_MERCHANT_CODE : '999008881';
  if (isProduction && (!merchantCode || merchantCode.trim() === '')) {
    throw new Error('REDSYS_MERCHANT_CODE environment variable is required in production');
  }
  
  return {
    merchantCode: merchantCode || '999008881',
    terminal: '001',
    currency: '978', // EUR
    transactionType: '0', // Authorization
    endpoint: isProduction 
      ? 'https://sis.redsys.es/sis/realizarPago' // Production endpoint
      : 'https://sis-t.redsys.es:25443/sis/realizarPago', // Test endpoint
    secretKey,
  };
}