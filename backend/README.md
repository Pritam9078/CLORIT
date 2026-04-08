# CLORIT Backend - Role-Based Signup System

## Overview

This backend API provides a complete role-based authentication system for the CLORIT platform, supporting three distinct user types: Community Members, NGOs, and Panchayat Officials.

## Features

- **Role-Based Registration**: Customized signup forms for each user type
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Robust data storage with Mongoose ODM
- **Input Validation**: Comprehensive validation using Joi
- **Password Security**: BCrypt encryption for password hashing
- **CORS Support**: Cross-origin resource sharing configured

## User Roles & Fields

### 1. Community Signup
- Full Name
- Email Address
- Community/Village Name
- Location (City, State, Country)
- Phone Number
- Password & Confirmation

### 2. NGO Signup
- Full Name
- Email Address
- NGO/Organization Name
- Registration Number
- Location (City, State, Country)
- Phone Number
- Website (Optional)
- Password & Confirmation

### 3. Panchayat Signup
- Full Name
- Email Address
- Panchayat Name
- Ward/Block Number
- Location (City, State, Country)
- Phone Number
- Password & Confirmation

## API Endpoints

### Authentication Routes

#### POST `/api/auth/signup`
Register a new user based on their role.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "confirmPassword": "securepassword",
  "role": "community|ngo|panchayat",
  "location": "Mumbai, Maharashtra, India",
  "phone": "+91-9876543210",
  // Role-specific fields...
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": { /* user object without password */ },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### GET `/api/auth/profile`
Get user profile information (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file based on `.env.example`:

```env
PORT=5000
JWT_SECRET=your_super_secure_jwt_secret_key_here
MONGODB_URI=mongodb://localhost:27017/clorit
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Database will be created automatically when first user registers

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get connection string
3. Replace `MONGODB_URI` in `.env` file

### 4. Start the Server

#### Development Mode (with auto-restart):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── models/
│   └── User.js          # User schema with role-based validation
├── routes/
│   └── auth.js          # Authentication endpoints
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── server.js           # Main server file
```

## Database Schema

The User model includes:

- **Common Fields**: fullName, email, password, role, location, phone
- **Community Fields**: communityName
- **NGO Fields**: ngoName, registrationNumber, website
- **Panchayat Fields**: panchayatName, wardBlockNumber
- **Metadata**: isActive, isVerified, timestamps, lastLogin

## Validation Rules

- **Email**: Must be valid email format and unique
- **Password**: Minimum 6 characters
- **Phone**: 10-15 digits
- **Role-specific fields**: Required based on selected role
- **Website**: Optional for NGOs, must be valid URL if provided

## Security Features

- Password hashing with BCrypt (12 rounds)
- JWT tokens with 7-day expiration
- Input validation and sanitization
- Error handling without sensitive information exposure
- CORS configuration for frontend integration

## Frontend Integration

The frontend UserSignup component automatically:
1. Collects role-specific form data
2. Sends POST request to `/api/auth/signup`
3. Stores JWT token in localStorage
4. Redirects to appropriate dashboard based on role

## Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Register Community User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@community.com",
    "password": "password123",
    "confirmPassword": "password123",
    "role": "community",
    "communityName": "Green Valley Village",
    "location": "Mumbai, Maharashtra, India",
    "phone": "9876543210"
  }'
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

## Development Notes

- Use `nodemon` for development (auto-restart on file changes)
- MongoDB connection with retry logic
- Comprehensive logging for debugging
- Separate validation schemas for each role
- Modular route structure for scalability

## Production Deployment

1. Set up MongoDB Atlas or dedicated MongoDB server
2. Configure environment variables
3. Use PM2 or similar process manager
4. Set up reverse proxy (Nginx)
5. Configure SSL certificates
6. Enable MongoDB authentication and connection security

## Future Enhancements

- Email verification system
- Password reset functionality
- Role-based access control middleware
- Admin dashboard for user management
- Analytics and reporting endpoints
- File upload for documents (NGO certificates, etc.)
