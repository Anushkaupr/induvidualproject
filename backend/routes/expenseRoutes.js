const express = require("express");
const router = express.Router();
const controller = require("../controller/expenseController");
const authGuard = require("../helpers/authGuard");

router.post("/", authGuard, controller.createExpense);
router.get("/", authGuard, controller.getExpenses);
router.put("/:id", authGuard, controller.updateExpense);
router.delete("/:id", authGuard, controller.deleteExpense);

module.exports = router;
