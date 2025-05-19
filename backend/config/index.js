const dotenv = require("dotenv");

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 8282,
  HOST: process.env.HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
  DIALECT: process.env.DIALECT,
  DB_PORT: process.env.DB_PORT,
};

module.exports = ENV;
