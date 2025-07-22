# SFTP Deployment Setup for Cloudways

This project is configured for automatic SFTP deployment to Cloudways hosting.

## Setup Instructions

### 1. Get Cloudways SFTP Credentials

1. Log in to your Cloudways dashboard
2. Go to your application
3. Click on **"Application Access Details"** tab
4. Note down:
   - **SFTP Host**: Usually `your-app-name.cloudwaysapps.com`
   - **SFTP Username**: Master username
   - **SFTP Password**: Master password
   - **Port**: Usually 22

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.deploy.example .env.deploy
   ```

2. Edit `.env.deploy` with your Cloudways credentials:
   ```bash
   SFTP_HOST=your-app.cloudwaysapps.com
   SFTP_USERNAME=your_master_username
   SFTP_PASSWORD=your_master_password
   SFTP_REMOTE_PATH=/public_html
   DOMAIN_NAME=liftvinov.com
   ```

### 3. Deploy Your Application

Run one of these commands:

```bash
# Build and deploy in one command
npm run deploy

# Deploy only (if build already exists)
npm run deploy:only
```

## Deployment Commands

- `npm run deploy` - Builds the React app and uploads to Cloudways
- `npm run deploy:only` - Uploads existing build without rebuilding
- `npm run build` - Builds the React app locally

## Security Notes

- ⚠️ **Never commit `.env.deploy` file** - it contains sensitive credentials
- The `.env.deploy` file is automatically ignored by git
- Store backup of credentials securely (password manager)

## Troubleshooting

### Connection Issues
- Verify SFTP credentials in Cloudways dashboard
- Check if your IP is whitelisted (if IP restrictions are enabled)
- Ensure port 22 is accessible from your network

### File Permission Issues
- Cloudways automatically handles file permissions
- If issues persist, check the deployment logs

### Domain Not Working
1. In Cloudways: **Domain Management** → Add your domain
2. Generate SSL certificate for the domain
3. Update DNS A record to point to Cloudways server IP
4. Wait 5-10 minutes for propagation

## File Structure

```
project/
├── deploy.js              # SFTP deployment script
├── .env.deploy.example    # Environment template
├── .env.deploy           # Your credentials (git ignored)
└── build/                # Built React app (uploaded to server)
```