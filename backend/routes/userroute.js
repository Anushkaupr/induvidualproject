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
  resetPasswordWithDOB,
} = require("../controller/userController");
 
const authGuard = require("../helpers/authGuard");
const isAdmin = require("../helpers/isAdmin");
router.post("/register", register);
router.post("/login", login);
router.post("/reset-password-dob", resetPasswordWithDOB);
router.get("/getAllUser", authGuard, isAdmin, getAllUser);
 

router.get("/:id", authGuard, isAdmin, getUserById);
 
router.put("/update/:id", authGuard, updateUserById);
 
router.delete("/delete/:id", authGuard, isAdmin, deleteUserById);
 
router.get("/getMe", authGuard, getMe);
 
module.exports = router;
 
 
