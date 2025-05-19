const { DataTypes } = require("sequelize");
const db = require("../config/db");

const PrescriptionItem = db.define(
  "PrescriptionItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    insuranceCoverage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amountDue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PrescriptionItem;
