#!/bin/bash

# Fix permissions for CloudBe deployment
# Run this script after npm run build

echo "🔧 Fixing file permissions for CloudBe deployment..."

# Set directory permissions to 755 (read/write/execute for owner, read/execute for group and others)
find build -type d -exec chmod 755 {} \;

# Set file permissions to 644 (read/write for owner, read for group and others)
find build -type f -exec chmod 644 {} \;

echo "✅ Permissions fixed!"
echo ""
echo "📁 Directory permissions: 755 (drwxr-xr-x)"
echo "📄 File permissions: 644 (-rw-r--r--)"
echo ""
echo "🚀 Ready to upload to CloudBe!"
echo ""
echo "Files to upload:"
echo "- build/index.html"
echo "- build/static/ (CSS and JS files)"
echo "- build/images/ (all images)"
echo "- build/logo192.webp, build/logo512.webp"
echo "- build/.htaccess (server config)"
echo "- build/manifest.json, build/robots.txt"