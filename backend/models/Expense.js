const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const User = require("./userModel");

const Expense = sequelize.define("Expense", {
  description: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
});

// Associations
Expense.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Expense, { foreignKey: "userId" });

module.exports = Expense;