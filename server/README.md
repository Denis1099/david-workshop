# David Workshop - Webhook Server

This is the webhook server for handling Green Invoice payment notifications for David's weightlifting workshops.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Copy the `.env` file and update with your actual values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Green Invoice Webhook Configuration
GREEN_INVOICE_WEBHOOK_SECRET=your_webhook_secret_from_green_invoice_dashboard

# Database Configuration (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# WhatsApp Configuration (optional)
WHATSAPP_PHONE=972501234567

# Security
ALLOWED_ORIGINS=https://your-domain.com,http://localhost:3000
```

### 3. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## 📡 Webhook Endpoints

### Main Webhook Endpoint
- **URL:** `POST /api/webhooks/green-invoice`
- **Purpose:** Receives webhook events from Green Invoice
- **Authentication:** HMAC-SHA256 signature verification

### Test Webhook Endpoint
- **URL:** `POST /api/webhooks/test`
- **Purpose:** Test webhook processing without signature verification
- **Usage:** Development and testing only

### Health Check
- **URL:** `GET /health`
- **Purpose:** Server health monitoring
- **Response:** JSON with server status

## 🔐 Security Features

- **Signature Verification:** All webhooks are verified using HMAC-SHA256
- **CORS Protection:** Configurable allowed origins
- **Helmet Security:** Security headers and protection
- **Rate Limiting:** Built-in protection against abuse

## 📋 Webhook Events Supported

| Event Type | Description | Action |
|------------|-------------|--------|
| `payment.completed` | Payment successful | Update payment status, increment participants, send confirmation |
| `payment.failed` | Payment failed | Update status, send failure notification |
| `payment.cancelled` | Payment cancelled | Update status to cancelled |
| `payment.refunded` | Payment refunded | Update status, decrement participants, send refund notification |
| `invoice.created` | Invoice created | Update payment with invoice details |
| `invoice.sent` | Invoice sent to customer | Log event |
| `invoice.paid` | Invoice paid | Update payment status |
| `invoice.cancelled` | Invoice cancelled | Update payment status |

## 🗄️ Database Schema

### Payments Table
```sql
CREATE TABLE payments (
  id VARCHAR PRIMARY KEY,
  seminar_id INTEGER REFERENCES seminars(id),
  participant_name VARCHAR NOT NULL,
  participant_email VARCHAR NOT NULL,
  participant_phone VARCHAR NOT NULL,
  amount DECIMAL NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  status VARCHAR NOT NULL,
  green_invoice_id VARCHAR,
  invoice_number VARCHAR,
  payment_method VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  failed_at TIMESTAMP,
  failure_reason TEXT
);
```

### Webhook Logs Table
```sql
CREATE TABLE webhook_logs (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR DEFAULT 'green_invoice'
);
```

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### 2. Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 3. Docker
```bash
docker build -t david-workshop-server .
docker run -p 5000:5000 --env-file .env david-workshop-server
```

### 4. Traditional Hosting
- Upload server files to your hosting provider
- Install Node.js dependencies
- Configure environment variables
- Start the server with PM2 or similar

## 🔧 Green Invoice Configuration

### Step 1: Get Your Webhook URL
After deploying your server, your webhook URL will be:
```
https://your-domain.com/api/webhooks/green-invoice
```

### Step 2: Configure in Green Invoice Dashboard
1. Log into Green Invoice dashboard
2. Go to Settings → Webhooks (or Developer → API)
3. Add webhook URL: `https://your-domain.com/api/webhooks/green-invoice`
4. Select events you want to receive:
   - ✅ Payment Completed
   - ✅ Payment Failed
   - ✅ Payment Cancelled
   - ✅ Payment Refunded
   - ✅ Invoice Created
   - ✅ Invoice Sent
   - ✅ Invoice Paid
   - ✅ Invoice Cancelled
5. Save configuration
6. Copy the webhook secret and add it to your `.env` file

### Step 3: Test the Webhook
1. Use the test endpoint to verify everything works:
```bash
curl -X POST https://your-domain.com/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{
    "event": "payment.completed",
    "data": {
      "id": "test_payment_123",
      "amount": 480,
      "currency": "ILS",
      "metadata": {
        "seminarId": "1",
        "participantEmail": "test@example.com",
        "participantName": "Test User"
      }
    }
  }'
```

## 📧 Email Notifications

The server supports automatic email notifications for:
- Payment confirmations
- Payment failures
- Refund notifications

Configure SMTP settings in your `.env` file to enable email notifications.

## 📱 WhatsApp Integration

Configure WhatsApp Business API credentials to send SMS confirmations.

## 🔍 Monitoring & Logging

### Log Files
- `logs/webhook-YYYY-MM-DD.log` - Webhook events
- `logs/payment-YYYY-MM-DD.log` - Payment events
- `logs/error-YYYY-MM-DD.log` - Error logs

### Log Rotation
- Logs are automatically rotated daily
- Old logs (>30 days) are automatically deleted

### Health Monitoring
Check server health:
```bash
curl https://your-domain.com/health
```

## 🛠️ Development

### Run in Development Mode
```bash
npm run dev
```

### Test Webhook Locally
Use ngrok to expose your local server:
```bash
ngrok http 5000
```

Then use the ngrok URL in Green Invoice webhook configuration.

## 🔧 Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Check that `GREEN_INVOICE_WEBHOOK_SECRET` is correctly configured
   - Verify the secret matches what's in Green Invoice dashboard

2. **Database connection fails**
   - Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct
   - Check that database tables exist

3. **Email notifications not working**
   - Verify SMTP configuration
   - Check email credentials and app passwords

4. **Server not accessible**
   - Check firewall settings
   - Verify port 5000 is open
   - Check domain/SSL configuration

### Debug Mode
Set `NODE_ENV=development` for detailed logging.

## 📞 Support

For support with the webhook server, contact:
- Email: info@davidworkshop.com
- WhatsApp: +972-50-123-4567

## 🔄 Updates

To update the webhook server:
1. Pull latest changes
2. Run `npm install`
3. Restart the server
4. Check logs for any issues