console.log("Le serveur est en marche...");

const express = require("express");
const ENV = require("./backend/config");
const { db } = require("./backend/models/index");

const app = express();

// Import routes
const userRoutes = require("./backend/routes/userRoute");
const clinicRoutes = require("./backend/routes/clinicRoutes");
const patientRoutes = require("./backend/routes/patientRoute");
const pharmacyRoutes = require("./backend/routes/pharmacyRoute");
const productRoutes = require("./backend/routes/productRoute");
const insuranceRoutes = require("./backend/routes/insuranceRoute");

// PORT
PORT = ENV.PORT;

// Prefix
app.use("/api/users", userRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/insurances", insuranceRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Erreur dans le serveur";
  const details = err.details || null;

  res.status(status).json({
    status,
    message,
    details,
  });
});

// midllewares

// Server
const startServer = async () => {
  try {
    // test connection to db
    await db.sync();
    console.log("Connexion réussie à la base de données");

    // synchronize models
    await db.sync({ force: false });
    console.log("Les modèles sont synchronisés avec la base de données");
  } catch (error) {
    console.error(
      "Erreur du démarrage de la base de données !!!",
      error.message
    );
  }

  app.listen(PORT, () => {
    try {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la base de données",
        error.message
      );
    }
  });
};

startServer();
