🔐 User Status Toggle API

A secure, production-ready REST API built with Node.js, Express, and MongoDB that enables authenticated users to perform bulk status operations across the entire user base.

This repository is open-source and actively open to contributions.

📌 Overview

User Status Toggle API demonstrates:

Secure JWT authentication

Bulk database operations using MongoDB

Scalable REST architecture

Production-oriented backend structure

Contribution-ready open source design

The system allows authenticated users to toggle the status of all users in a single operation using optimized MongoDB bulk updates.

🚀 Core Capabilities

User Registration

Secure Login with JWT

Password Hashing via bcrypt

Protected Routes via Middleware

Bulk Status Toggle (Active ↔ Inactive)

MongoDB Aggregation Support

Clean Controller-Service Structure

Production-ready configuration model

🧠 Bulk Toggle Logic

When the toggle endpoint is triggered:

If majority users are active → all users become inactive

If majority users are inactive → all users become active

The operation executes in a single atomic bulk update for efficiency and scalability.

🏗 System Architecture
Client
   │
   ▼
Express Router
   │
   ▼
Controller Layer
   │
   ▼
MongoDB (via Mongoose)

The application follows a layered structure:

├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── .env
├── package.json
└── README.md
🛠 Technology Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB
ODM	Mongoose
Authentication	JWT
Security	bcrypt
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/user-status-toggle-api.git
cd user-status-toggle-api
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=********************************
JWT_SECRET=super_secure_jwt_secret
Environment Variables Explained
Variable	Description
PORT	Application runtime port
MONGO_URI	MongoDB connection string (local or cloud)
JWT_SECRET	Secret key used for signing JWT tokens

⚠️ Do not commit .env to version control.

4. Start Application
npm start

Server will be available at:

http://localhost:5000
🔗 API Endpoints
User Signup

POST /api/auth/signup

{
  "email": "john@example.com",
  "password": "password123"
}
User Login

POST /api/auth/login

{
  "email": "john@example.com",
  "password": "password123"
}

Returns:

{
  "token": "jwt_token_here"
}
Toggle All Users Status

POST /api/users/toggle-status

Requires header:

Authorization: Bearer <jwt_token>

Performs a bulk update across all user records.

🔐 Security Model

Passwords are hashed using bcrypt

JWT secures all protected routes

Middleware validates token before execution

Sensitive credentials are environment-based

No secrets are stored in source code

🧪 Expected Flow

User registers

User logs in and receives JWT

User calls protected toggle endpoint

All users’ statuses flip via bulk update

📦 Production Considerations

Before deploying:

Use strong JWT secret

Use a secure MongoDB URI

Enable HTTPS in production

Configure proper logging

Validate environment variables

Add rate limiting (recommended)

Add input validation middleware

🤝 Contributing

This project is open to contributions.

If you would like to enhance:

Backend performance

Security hardening

UI improvements

Test coverage

DevOps setup

Documentation clarity

Architecture refactor

You are welcome to contribute.

Contribution Guidelines

Fork the repository

Create a feature branch

git checkout -b feature/your-feature-name

Implement changes

Test the full application flow

Verify production readiness

Submit a Pull Request

Production Validation Requirement

Before submitting a PR:

Ensure authentication works

Ensure toggle logic remains consistent

Ensure no breaking API changes

Test with real MongoDB instance

Confirm environment variables are not hardcoded

Validate error handling

Confirm no sensitive data exposure

Contributions must maintain production stability.

Opening Issues

There are currently no open issues.

If you would like to:

Modify UI

Improve server logic

Add features

Refactor architecture

Open an issue first to discuss the proposal before implementation.

Collaborative discussion ensures design consistency.

📈 Roadmap

Planned Improvements:

Role-based Access Control (Admin/User)

Analytics Dashboard

Unit & Integration Testing

Swagger / OpenAPI Documentation

Docker Support

CI/CD Pipeline Integration

Logging & Monitoring Integration

Rate Limiting & Security Enhancements

👨‍💻 Maintainer

Aryan Hooda
Full Stack Developer | Backend Engineer

⭐ Support

If this project helps you:

Star the repository.

Contributions, feedback, and architectural suggestions are welcome.
