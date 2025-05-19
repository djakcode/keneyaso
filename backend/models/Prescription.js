const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Prescription = db.define(
  "Prescription",
  {
    prescriptionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Prescription;
