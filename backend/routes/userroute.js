const router = require("express").Router();
const multer = require("multer");
const upload = multer();
 
const { register, login } = require("../controller/userController");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getMe,
} = require("../controller/userController");
 
const authGuard = require("../helpers/authGuard");
const isAdmin = require("../helpers/isAdmin");
 
// Auth routes
router.post("/register", register);
router.post("/login", login);
 
// User CRUD routes
router.get("/getAllUser", authGuard, isAdmin, getAllUser);
 
// ✅ Fix: frontend calls GET /api/user/:id
router.get("/:id", authGuard, isAdmin, getUserById);
 
// ✅ Matches frontend PUT /api/user/update/:id
router.put("/update/:id", authGuard, updateUserById);
 
// ✅ Matches frontend DELETE /api/user/delete/:id
router.delete("/delete/:id", authGuard, isAdmin, deleteUserById);
 
// Profile of logged-in user
router.get("/getMe", authGuard, getMe);
 
module.exports = router;
 
 
