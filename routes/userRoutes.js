const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  toggleAllUsersStatus,
  getDistanceFromDestination,
  getUsersByDays,
  getAllUsers,
  deleteAccount,
} = require("../controllers/userController");
const rateLimit = require("express-rate-limit");

const deleteAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 delete-account requests per windowMs
});

const userRoutesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 user-related requests per windowMs
});

router.get("/users", userRoutesLimiter, authMiddleware, getAllUsers);
router.post(
  "/users/toggle-status",
  userRoutesLimiter,
  authMiddleware,
  toggleAllUsersStatus,
);
router.get(
  "/users/distance",
  userRoutesLimiter,
  authMiddleware,
  getDistanceFromDestination,
);
router.get("/users/by-days", userRoutesLimiter, authMiddleware, getUsersByDays);
router.delete(
  "/users/delete-account",
  deleteAccountLimiter,
  authMiddleware,
  deleteAccount,
);

module.exports = router;
