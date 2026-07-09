#!/bin/bash
# Deploy Script für NeuroAthletic Analyse
# Ausführen auf dem Server: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

cd /var/www/provoid-analyse

# Git Pull
echo "📥 Pulling latest changes..."
git pull origin main

# Dependencies installieren
echo "📦 Installing dependencies..."
npm install --production=false

# Frontend bauen
echo "🔨 Building frontend..."
npm run build

# PM2 neustarten
echo "🔄 Restarting PM2 process..."
pm2 restart provoid-analyse

echo "✅ Deployment complete!"
pm2 status
