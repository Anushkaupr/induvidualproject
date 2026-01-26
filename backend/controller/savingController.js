const Saving = require("../models/Saving");

// Create a saving
exports.createSaving = async (req, res) => {
  try {
    const { description, amount } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const saving = await Saving.create({
      description,
      amount,
      userId,
    });

    res.status(201).json({
      success: true,
      data: saving,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const savings = await Saving.findAll({ where: { userId: req.user.id } });
    res.json({ success: true, data: savings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Update saving
exports.updateSaving = async (req, res) => {
  try {
    const [updated] = await Saving.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Saving not found",
      });
    }

    const updatedSaving = await Saving.findByPk(req.params.id);

    res.json({
      success: true,
      data: updatedSaving,
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete saving
exports.deleteSaving = async (req, res) => {
  try {
    const deleted = await Saving.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Saving not found",
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
