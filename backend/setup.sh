#!/bin/bash

# CLORIT Backend Setup Script
echo "🚀 Setting up CLORIT Backend..."

# Change to backend directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual configuration values:"
    echo "   - JWT_SECRET: Use a secure random string"
    echo "   - MONGODB_URI: Your MongoDB connection string"
    echo "   - EMAIL_* : Email service configuration (optional)"
fi

# Check if MongoDB is running locally
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping').ok" localhost/clorit --quiet 2>/dev/null; then
        echo "✅ Local MongoDB is running"
    else
        echo "⚠️  Local MongoDB is not running or not accessible"
        echo "   Please start MongoDB or use MongoDB Atlas"
    fi
elif command -v mongo &> /dev/null; then
    if mongo --eval "db.runCommand('ping').ok" localhost/clorit --quiet 2>/dev/null; then
        echo "✅ Local MongoDB is running"
    else
        echo "⚠️  Local MongoDB is not running or not accessible"
        echo "   Please start MongoDB or use MongoDB Atlas"
    fi
else
    echo "⚠️  MongoDB client not found. Please ensure MongoDB is installed or use MongoDB Atlas"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Start the development server: npm run dev"
echo "3. Or start production server: npm start"
echo ""
echo "📚 The server will run on: http://localhost:5000"
echo "🔍 Health check endpoint: http://localhost:5000/health"
echo "🔐 API endpoints: http://localhost:5000/api/auth/*"
echo ""
echo "Happy coding! 🎉"
