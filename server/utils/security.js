const crypto = require('crypto');

/**
 * Verify webhook signature from Green Invoice
 * @param {Buffer} payload - Raw webhook payload
 * @param {string} signature - Signature from webhook headers
 * @returns {boolean} - True if signature is valid
 */
function verifyWebhookSignature(payload, signature) {
  const webhookSecret = process.env.GREEN_INVOICE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('GREEN_INVOICE_WEBHOOK_SECRET not configured');
    return false;
  }
  
  if (!signature) {
    console.error('No signature provided in webhook headers');
    return false;
  }
  
  try {
    // Create expected signature using HMAC-SHA256
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');
    
    // Compare signatures using timing-safe comparison
    const providedSignature = signature.replace('sha256=', ''); // Remove prefix if present
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Generate webhook signature for testing
 * @param {Buffer} payload - Raw webhook payload
 * @returns {string} - Generated signature
 */
function generateWebhookSignature(payload) {
  const webhookSecret = process.env.GREEN_INVOICE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('GREEN_INVOICE_WEBHOOK_SECRET not configured');
  }
  
  return crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');
}

/**
 * Validate webhook payload structure
 * @param {Object} payload - Parsed webhook payload
 * @returns {boolean} - True if payload is valid
 */
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }
  
  // Check required fields
  if (!payload.event || typeof payload.event !== 'string') {
    return false;
  }
  
  if (!payload.data || typeof payload.data !== 'object') {
    return false;
  }
  
  // Validate event types
  const validEvents = [
    'payment.completed',
    'payment.failed',
    'payment.cancelled',
    'payment.refunded',
    'invoice.created',
    'invoice.sent',
    'invoice.paid',
    'invoice.cancelled'
  ];
  
  if (!validEvents.includes(payload.event)) {
    console.warn(`Unknown webhook event: ${payload.event}`);
    // Don't return false - log warning but continue processing
  }
  
  return true;
}

module.exports = {
  verifyWebhookSignature,
  generateWebhookSignature,
  validateWebhookPayload
};