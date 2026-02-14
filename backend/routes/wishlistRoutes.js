const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { addToWishlist, getWishlist , deleteWish } = require("../controller/wishlistController");
const authGuard = require("../helpers/authGuard");

// POST for adding
router.post("/", authGuard, upload.single("wishlistImage"), addToWishlist);

// GET for displaying on dashboard - THIS WAS MISSING
router.get("/", authGuard, getWishlist);
router.delete("/:id", authGuard, deleteWish);
module.exports = router;