const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Appointment = db.define(
  "Appointment",
  {
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "planifié",
      validate: {
        isIn: [["planifié", "annulé", "terminé"]],
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fee: {
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

module.exports = Appointment;
