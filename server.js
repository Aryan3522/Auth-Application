require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const AuthRoutes = require("./routes/auth-routes.js");
const UserRoutes = require("./routes/userRoutes.js");
const rateLimit = require("express-rate-limit");
const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for HTML routes
const htmlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

// Serve HTML
app.get("/", htmlLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/login", htmlLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", htmlLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Routes
app.use("/api", apiLimiter, AuthRoutes);
app.use("/api", apiLimiter, UserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
