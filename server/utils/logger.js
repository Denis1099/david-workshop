const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Log webhook events with timestamp and context
 * @param {string} event - Event type
 * @param {Object} data - Event data
 */
function logWebhookEvent(event, data) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    data: typeof data === 'object' ? data : { message: data }
  };
  
  // Log to console
  console.log(`[${timestamp}] ${event}:`, JSON.stringify(logEntry.data, null, 2));
  
  // Log to file
  const logFile = path.join(logsDir, `webhook-${new Date().toISOString().split('T')[0]}.log`);
  const logLine = JSON.stringify(logEntry) + '\n';
  
  fs.appendFileSync(logFile, logLine);
}

/**
 * Log error events
 * @param {string} context - Error context
 * @param {Error} error - Error object
 */
function logError(context, error) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    context,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    }
  };
  
  // Log to console
  console.error(`[${timestamp}] ERROR in ${context}:`, error);
  
  // Log to file
  const logFile = path.join(logsDir, `error-${new Date().toISOString().split('T')[0]}.log`);
  const logLine = JSON.stringify(logEntry) + '\n';
  
  fs.appendFileSync(logFile, logLine);
}

/**
 * Log payment events specifically
 * @param {string} event - Payment event type
 * @param {Object} paymentData - Payment data
 */
function logPaymentEvent(event, paymentData) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event: `PAYMENT_${event}`,
    payment: {
      id: paymentData.id,
      seminarId: paymentData.seminarId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      participantEmail: paymentData.participantEmail,
      participantName: paymentData.participantName
    }
  };
  
  // Log to console
  console.log(`[${timestamp}] PAYMENT_${event}:`, JSON.stringify(logEntry.payment, null, 2));
  
  // Log to file
  const logFile = path.join(logsDir, `payment-${new Date().toISOString().split('T')[0]}.log`);
  const logLine = JSON.stringify(logEntry) + '\n';
  
  fs.appendFileSync(logFile, logLine);
}

/**
 * Clean up old log files (older than 30 days)
 */
function cleanupOldLogs() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  try {
    const files = fs.readdirSync(logsDir);
    
    files.forEach(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < thirtyDaysAgo) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up old log file: ${file}`);
      }
    });
  } catch (error) {
    console.error('Error cleaning up old logs:', error);
  }
}

// Run cleanup on startup
cleanupOldLogs();

// Schedule cleanup to run daily
setInterval(cleanupOldLogs, 24 * 60 * 60 * 1000); // 24 hours

module.exports = {
  logWebhookEvent,
  logError,
  logPaymentEvent,
  cleanupOldLogs
};