#!/bin/bash

# Fix file permissions for web deployment
# This script sets proper permissions for a web server

echo "🔧 Setting file permissions for web deployment..."

# Set directory permissions to 755 (read/write/execute for owner, read/execute for others)
find build -type d -exec chmod 755 {} \;

# Set file permissions to 644 (read/write for owner, read for others)
find build -type f -exec chmod 644 {} \;

# Make sure .htaccess is readable
if [ -f "build/.htaccess" ]; then
    chmod 644 build/.htaccess
    echo "✅ Set .htaccess permissions to 644"
fi

# Make sure index.html is readable
if [ -f "build/index.html" ]; then
    chmod 644 build/index.html
    echo "✅ Set index.html permissions to 644"
fi

echo "✅ File permissions set successfully!"
echo "📁 Directories: 755 (rwxr-xr-x)"
echo "📄 Files: 644 (rw-r--r--)"