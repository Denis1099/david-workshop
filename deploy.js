const SftpClient = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs');

// Load deployment-specific environment variables
require('dotenv').config({ path: '.env.deploy' });

const sftp = new SftpClient();

// SFTP configuration - these should be set in .env file
const config = {
  host: process.env.SFTP_HOST || 'your-server.cloudways.com',
  port: process.env.SFTP_PORT || 22,
  username: process.env.SFTP_USERNAME || 'master_username',
  password: process.env.SFTP_PASSWORD || 'your_password'
};

const localBuildPath = path.join(__dirname, 'build');
const remotePath = process.env.SFTP_REMOTE_PATH || '/public_html';

// Function to upload contents of build folder to remote directory
async function uploadBuildContents(localPath, remotePath) {
  console.log(`🔍 Reading directory: ${localPath}`);
  const items = await fs.promises.readdir(localPath, { withFileTypes: true });
  
  console.log(`📋 Found ${items.length} items to upload:`);
  items.forEach(item => {
    console.log(`  ${item.isDirectory() ? '📁' : '📄'} ${item.name}`);
  });
  
  for (const item of items) {
    const localItemPath = path.join(localPath, item.name);
    const remoteItemPath = `${remotePath}/${item.name}`;
    
    if (item.isDirectory()) {
      // Create remote directory if it doesn't exist
      console.log(`📁 Creating/uploading directory: ${item.name}`);
      const remoteExists = await sftp.exists(remoteItemPath);
      if (!remoteExists) {
        await sftp.mkdir(remoteItemPath, true);
        console.log(`  ✅ Created directory: ${remoteItemPath}`);
      }
      // Recursively upload directory contents manually (not using uploadDir)
      await uploadDirectoryContents(localItemPath, remoteItemPath);
    } else {
      // Upload file with proper transfer mode
      console.log(`📄 Uploading file: ${item.name} → ${remoteItemPath}`);
      
      // Use binary mode for JS, CSS, and other assets to prevent corruption
      const transferOptions = {
        encoding: null, // Use binary mode
        writeStreamOptions: { flags: 'w', encoding: null },
        readStreamOptions: { encoding: null }
      };
      
      await sftp.put(localItemPath, remoteItemPath, transferOptions);
      console.log(`  ✅ Uploaded: ${item.name}`);
    }
  }
}

// Recursively upload directory contents without creating parent directory
async function uploadDirectoryContents(localDirPath, remoteDirPath) {
  const items = await fs.promises.readdir(localDirPath, { withFileTypes: true });
  
  for (const item of items) {
    const localItemPath = path.join(localDirPath, item.name);
    const remoteItemPath = `${remoteDirPath}/${item.name}`;
    
    if (item.isDirectory()) {
      const remoteExists = await sftp.exists(remoteItemPath);
      if (!remoteExists) {
        await sftp.mkdir(remoteItemPath, true);
      }
      await uploadDirectoryContents(localItemPath, remoteItemPath);
    } else {
      console.log(`    📄 ${item.name}`);
      
      // Use binary mode for all files to prevent corruption
      const transferOptions = {
        encoding: null, // Use binary mode
        writeStreamOptions: { flags: 'w', encoding: null },
        readStreamOptions: { encoding: null }
      };
      
      await sftp.put(localItemPath, remoteItemPath, transferOptions);
    }
  }
}

async function deployToCloudways() {
  try {
    console.log('🚀 Starting deployment to Cloudways...');
    console.log(`📁 Local build path: ${localBuildPath}`);
    console.log(`🌐 Remote path: ${config.host}${remotePath}`);

    // Connect to SFTP server
    await sftp.connect(config);
    console.log('✅ Connected to SFTP server');

    // Check if remote directory exists, create if not
    const remoteExists = await sftp.exists(remotePath);
    if (!remoteExists) {
      await sftp.mkdir(remotePath, true);
      console.log(`📂 Created remote directory: ${remotePath}`);
    }

    // Clear existing files (optional - be careful with this)
    const clearExisting = process.env.CLEAR_REMOTE_FILES === 'true';
    if (clearExisting) {
      console.log('🧹 Clearing existing files...');
      const files = await sftp.list(remotePath);
      for (const file of files) {
        if (file.name !== '.' && file.name !== '..' && file.name !== '.htaccess') {
          const filePath = `${remotePath}/${file.name}`;
          if (file.type === 'd') {
            await sftp.rmdir(filePath, true);
          } else {
            await sftp.delete(filePath);
          }
        }
      }
    }

    // Upload build directory contents (not the directory itself)
    console.log('📤 Uploading files...');
    await uploadBuildContents(localBuildPath, remotePath);
    console.log('✅ All files uploaded successfully!');

    // Close connection
    await sftp.end();
    console.log('🎉 Deployment completed successfully!');
    console.log(`🌍 Your site should be available at: https://${config.host.replace(/^.*\.cloudwaysapps\.com$/, process.env.DOMAIN_NAME || config.host)}`);

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deployToCloudways();