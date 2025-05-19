const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Insurance = db.define(
  "Insurance",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coveragePercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Insurance;
