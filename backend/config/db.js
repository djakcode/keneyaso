const Sequelize = require("sequelize");
const ENV = require("../config/index");

console.log("Initialisation de MySQL...");

const db = new Sequelize(ENV.DATABASE, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.HOST,
  dialect: ENV.DIALECT,
  port: ENV.DB_PORT,
  logging: false,
});

// Connect to DB
const connectDB = async () => {
  try {
    console.log("Essaie de connexion à la base de données...");
    await db.authenticate();
    console.log("Connecté avec succès à MySQL :)");
  } catch (error) {
    console.error("Erreur de démarrage de la base de données", error.message);
  }
};

connectDB();

module.exports = db;
