require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Routes
app.use("/api", require("./routes/auth-routes.js"));
app.use("/api", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
