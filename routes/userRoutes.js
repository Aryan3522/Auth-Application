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

router.get("/users", authMiddleware, userRoutesLimiter, getAllUsers);
router.post(
  "/users/toggle-status",
  authMiddleware,
  userRoutesLimiter,
  toggleAllUsersStatus
);
router.get(
  "/users/distance",
  authMiddleware,
  userRoutesLimiter,
  getDistanceFromDestination
);
router.get(
  "/users/by-days",
  authMiddleware,
  userRoutesLimiter,
  getUsersByDays
);
router.delete(
  "/users/delete-account",
  authMiddleware,
  deleteAccountLimiter,
  deleteAccount
);

module.exports = router;
