const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  toggleAllUsersStatus,
  getDistanceFromDestination,
  getUsersByDays,
} = require("../controllers/userController");

router.post("/users/toggle-status", authMiddleware, toggleAllUsersStatus);
router.get("/users/distance", authMiddleware, getDistanceFromDestination);
router.get("/users/by-days", authMiddleware, getUsersByDays);

module.exports = router;
