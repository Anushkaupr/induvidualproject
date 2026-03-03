const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const User = require("./userModel");

const Wishlist = sequelize.define("Wishlist", {
  imageUrl: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  note: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
});


Wishlist.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Wishlist, { foreignKey: "userId" });

module.exports = Wishlist;