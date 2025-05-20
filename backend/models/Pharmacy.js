const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Pharmacy = db.define(
  "Pharmacy",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pharmacy;
