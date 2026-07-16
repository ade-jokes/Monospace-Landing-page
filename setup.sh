#!/usr/bin/env bash
# Monospace Landing Page - Development Setup Script

set -e

echo "🚀 Monospace Landing Page - Development Setup"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "\n📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "\n⚠️  .env.local file not found!"
    echo "📝 Creating .env.local from .env.example (if available)"
    if [ -f .env.example ]; then
        cp .env.example .env.local
    else
        cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_gemini_api_key_here
EOF
    fi
    echo "📝 Updated .env.local - please add your GEMINI_API_KEY"
fi

echo "\n✅ Setup complete!"
echo "\n📖 To start development:"
echo "   1. Terminal 1: npm run dev          (starts Vite on port 3000)"
echo "   2. Terminal 2: npm run server       (starts Express on port 5000)"
echo "\n📚 Frontend: http://localhost:3000"
echo "📚 Backend API: http://localhost:5000/api"
