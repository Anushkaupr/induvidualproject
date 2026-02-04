const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const User = require("./userModel");

const Saving = sequelize.define("Saving", {
  description: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
});

// Associations
Saving.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Saving, { foreignKey: "userId" });

module.exports = Saving;