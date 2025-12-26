# 🔐 User Status Toggle API

A backend REST API built with **Node.js**, **Express.js**, and **MongoDB** that allows users to **sign up, log in**, and — once authenticated — use a special power to **toggle the status of all users at once**.

This project demonstrates secure authentication, role-based actions, and bulk updates in a scalable backend system.

---

## ✨ Features

- ✅ User Signup & Login
- 🔑 JWT-based Authentication
- 👤 User Status Management (active / inactive)
- ⚡ Special Power: Toggle status of **all users** with one click
- 🗄 MongoDB for persistent storage
- 🧱 Clean REST API architecture

---

## 🧠 Special Power Logic

Once logged in, a user can trigger a toggle action that:
- If most users are **active**, all become **inactive**
- If most users are **inactive**, all become **active**

👉 Example:
- 5 users active → all switch to inactive  
- 2 users inactive → all switch to active  

This happens in a **single API call** using a bulk update.

---

## 🛠 Tech Stack

- **Node.js** – Runtime
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM
- **JWT** – Authentication
- **bcrypt** – Password hashing

---

## 📁 Project Structure

├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── app.js
├── .env
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/your-username/user-status-toggle-api.git
cd user-status-toggle-api

2️⃣ Install dependencies

npm install

3️⃣ Setup environment variables
Create a .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/status_api
JWT_SECRET=your_super_secret_key

4️⃣ Start the server

npm start

Server will start at:

http://localhost:5000

---

🔗 API Endpoints

📝 Signup
POST /api/auth/signup

{
  "email": "john@example.com",
  "password": "password123"
}

---

🔐 Login
POST /api/auth/login

{
  "email": "john@example.com",
  "password": "password123"
}
➡️ Returns JWT token.

⚡ Toggle All Users Status

---

POST /api/users/toggle-status
Requires Authorization: Bearer <token>
📌 Toggles the status of all users based on current active/inactive count.

---

🔒 Authentication

Passwords are hashed using bcrypt
JWT is used for securing protected routes
Pass token in headers:

Authorization: Bearer <your_token_here>

---

🧪 Example Use Case

User signs up

Logs in and receives JWT

Calls toggle endpoint

All users’ statuses are flipped instantly

---

🚀 Future Enhancements

🔄 Role-based access (admin/user)

📊 Analytics on status changes

🧪 Unit & integration tests

🐳 Docker support

📘 Swagger API docs

---
🤝 Contributing

Contributions are welcome!
Feel free to fork this repo, open issues, and submit PRs.

---

👨‍💻 Author

Aryan Hooda
Full Stack Developer | Backend Enthusiast

If you found this project helpful, give it a ⭐!


---

If you want, I can also:
✅ Add a **Postman collection** section  
✅ Generate **Swagger docs**  
✅ Create a **Docker setup**  
✅ Rewrite this for enterprise README tone  

Just say the word — let’s make this repo stand out.
