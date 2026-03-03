const Income = require("../models/Income");
exports.getIncomes = async (req, res) => {
  try {
    const data = await Income.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']] 
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.createIncome = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newIncome = await Income.create({
      description,
      amount,
      userId: req.user.id
    });
    res.json({ success: true, data: newIncome });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount } = req.body;
    await Income.update({ description, amount }, { where: { id, userId: req.user.id } });
    const updated = await Income.findByPk(id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Income.destroy({ 
      where: { id, userId: req.user.id } 
    });
    
    if (deleted) {
      res.json({ success: true, message: "Income deleted" });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
