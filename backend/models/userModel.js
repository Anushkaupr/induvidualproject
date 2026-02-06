
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false }, // <--- Added DOB
  role: { type: DataTypes.STRING, defaultValue: "user" },
  resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
  resetPasswordExpires: { type: DataTypes.DATE, allowNull: true },
});

module.exports = User;