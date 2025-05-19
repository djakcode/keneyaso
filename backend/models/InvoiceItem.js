const { DataTypes } = require("sequelize");
const db = require("../config/db");

const InvoiceItem = db.define(
  "InvoiceItem",
  {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
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

module.exports = InvoiceItem;
