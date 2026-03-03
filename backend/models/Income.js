const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const User = require("./userModel");

const Income = sequelize.define("Income", {
  description: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  amount: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  category: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  date: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW 
  },
});

Income.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Income, { foreignKey: "userId" });

module.exports = Income;

