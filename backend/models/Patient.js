const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Patient = db.define(
  "Patient",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "homme",
      validate: {
        isIn: [["homme", "femme"]],
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Patient;
