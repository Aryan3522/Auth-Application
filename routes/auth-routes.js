const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/auth-controller.js");
const rateLimit = require("express-rate-limit");

// Strict limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status_code: 429,
    message: "Too many login attempts. Try again in 15 minutes.",
  },
});

// Slightly relaxed limiter for register
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);

module.exports = router;
