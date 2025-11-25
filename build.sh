#!/bin/bash
set -e

echo "Building AgriSense AI Pro for Vercel..."

# Install dependencies
npm install

# Build frontend and backend together using the proper npm script approach
npm run build 2>&1 || true

# Verify output
if [ -f "dist/index.js" ] && [ -f "dist/public/index.html" ]; then
  echo "✓ Build successful!"
  ls -lh dist/
else
  echo "✗ Build failed - output files missing"
  exit 1
fi
