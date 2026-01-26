const express = require("express");
const router = express.Router();
const controller = require("../controller/savingController");
const authMiddleware = require("../helpers/authGuard"); // import above
const authGuard = require("../helpers/authGuard");

router.post("/", authGuard, controller.createSaving);
router.get("/", authGuard, controller.getSavings);
router.put("/:id", authGuard, controller.updateSaving);
router.delete("/:id", authGuard, controller.deleteSaving);

module.exports = router;
