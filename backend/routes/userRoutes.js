const express = require("express");
const router = express.Router();
const {
    updateProfile,
    deleteResume,
    getPublicProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// Protected Routes
router.put("/profile", protect, updateProfile);
router.post("/resume", protect, deleteResume);

// Public Route
router.get("/:id", getPublicProfile);

module.exports = router;
