const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Invoice = db.define(
  "Invoice",
  {
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    insuraneCoverage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amountDue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "impayé",
      validate: {
        isIn: [["payé", "impayé"]],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Invoice;
