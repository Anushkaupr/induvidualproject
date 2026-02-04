const Expense = require("../models/Expense");


exports.createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      date,
      userId,
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const [updated] = await Expense.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await Expense.findByPk(req.params.id);

    res.json({
      success: true,
      data: updatedExpense,
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE EXPENSE =================
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
