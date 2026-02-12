const express = require("express");
const router = express.Router();
// FIX: Point to incomeController, NOT savingController
const controller = require("../controller/incomeController"); 
const authGuard = require("../helpers/authGuard");

// FIX: Use the income controller functions
router.post("/", authGuard, controller.createIncome);
router.get("/", authGuard, controller.getIncomes);
router.put("/:id", authGuard, controller.updateIncome);
router.delete("/:id", authGuard, controller.deleteIncome);

module.exports = router;