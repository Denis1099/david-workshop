const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const webhookHandler = require('./handlers/webhookHandler');
const { verifyWebhookSignature } = require('./utils/security');
const { logWebhookEvent } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for API endpoints
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Green Invoice webhook endpoint
app.post('/api/webhooks/green-invoice', 
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      const signature = req.headers['x-signature'] || req.headers['x-green-invoice-signature'];
      const payload = req.body;
      
      // Log the webhook event
      logWebhookEvent('GREEN_INVOICE_WEBHOOK_RECEIVED', {
        signature: signature ? 'present' : 'missing',
        payloadSize: payload.length,
        headers: req.headers
      });

      // Verify webhook signature
      if (!verifyWebhookSignature(payload, signature)) {
        logWebhookEvent('WEBHOOK_SIGNATURE_VERIFICATION_FAILED', {
          signature,
          payloadPreview: payload.toString().substring(0, 100)
        });
        return res.status(401).json({ error: 'Unauthorized: Invalid signature' });
      }

      // Parse the webhook payload
      let webhookData;
      try {
        webhookData = JSON.parse(payload.toString());
      } catch (parseError) {
        logWebhookEvent('WEBHOOK_PAYLOAD_PARSE_ERROR', {
          error: parseError.message,
          payload: payload.toString()
        });
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }

      // Process the webhook event
      const result = await webhookHandler.processWebhook(webhookData);
      
      if (result.success) {
        logWebhookEvent('WEBHOOK_PROCESSED_SUCCESSFULLY', {
          event: webhookData.event,
          paymentId: webhookData.data?.id,
          result
        });
        res.status(200).json({ message: 'Webhook processed successfully', data: result });
      } else {
        logWebhookEvent('WEBHOOK_PROCESSING_FAILED', {
          event: webhookData.event,
          error: result.error,
          webhookData
        });
        res.status(500).json({ error: 'Webhook processing failed', details: result.error });
      }
    } catch (error) {
      logWebhookEvent('WEBHOOK_SERVER_ERROR', {
        error: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Test webhook endpoint (for development)
app.post('/api/webhooks/test', express.json(), async (req, res) => {
  try {
    const testEvent = req.body;
    
    logWebhookEvent('TEST_WEBHOOK_RECEIVED', testEvent);
    
    const result = await webhookHandler.processWebhook(testEvent);
    
    res.json({ 
      message: 'Test webhook processed',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 David Workshop Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Webhook URL: /api/webhooks/green-invoice`);
  console.log(`✅ Health check: /health`);
});

module.exports = app;