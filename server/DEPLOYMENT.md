# CloudBe Deployment Guide

## Webhook Server Deployment

### Files to Upload
Upload the entire `server` folder to CloudBe with these key files:
- `server.js` - Main server file
- `package.json` - Dependencies
- `handlers/` - Webhook handlers
- `services/` - Database and notification services
- `utils/` - Security and logging utilities
- `.env` - Environment variables (update with CloudBe settings)

### Environment Variables to Set in CloudBe
```
NODE_ENV=production
PORT=5000

# Green Invoice Configuration
GREEN_INVOICE_WEBHOOK_SECRET=your_webhook_secret_from_green_invoice_dashboard

# Supabase Configuration
SUPABASE_URL=https://czszywrzxfckhxutxuqj.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=liftvinov.media@gmail.com
SMTP_PASS=your_app_password

# Security
ALLOWED_ORIGINS=https://liftvinov.com,http://localhost:3000
```

### Node.js Settings for CloudBe
- **Node.js Version**: 18.x or higher
- **Start Command**: `npm start`
- **Build Command**: `npm install`
- **Main File**: `server.js`

### After Deployment
1. Test health endpoint: `https://webhook.liftvinov.com/health`
2. Your webhook URL will be: `https://webhook.liftvinov.com/api/webhooks/green-invoice`
3. Configure this URL in Green Invoice dashboard

---

## React App Deployment

### Build the React App
```bash
npm run build
```

### Files to Upload
Upload the entire `build` folder contents to CloudBe:
- `build/static/` - CSS and JS files
- `build/index.html` - Main HTML file
- All other files from the build folder

### Environment Variables for React App
```
REACT_APP_SUPABASE_URL=https://czszywrzxfckhxutxuqj.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6c3p5d3J6eGZja2h4dXR4dXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDI1NDgsImV4cCI6MjA2ODA3ODU0OH0.0le9YFoIaw0kIkzP_yQyUfV2uyFHUo2MQHOeToulbFM

# Green Invoice Configuration
REACT_APP_GREEN_INVOICE_API_URL=https://api.greeninvoice.co.il/api/v1
REACT_APP_GREEN_INVOICE_API_KEY=your_green_invoice_api_key_here
REACT_APP_GREEN_INVOICE_SECRET=your_green_invoice_secret_here
REACT_APP_GREEN_INVOICE_ENVIRONMENT=production

# Webhook Configuration
REACT_APP_WEBHOOK_URL=https://webhook.liftvinov.com/api/webhooks/green-invoice
REACT_APP_WEBHOOK_SECRET=your_webhook_secret_here

# Email Configuration
REACT_APP_RESEND_API_KEY=your_resend_api_key_here
```

### CloudBe Settings for React App
- **Static Site**: Yes
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node.js Version**: 18.x or higher

---

## Deployment Order
1. **Deploy Webhook Server First** - Get the webhook URL
2. **Configure Green Invoice** - Add webhook URL to dashboard
3. **Update React App** - Add webhook URL to environment variables
4. **Deploy React App** - Upload build files
5. **Test Everything** - Complete payment flow test