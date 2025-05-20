const Prescription = require("../models/Prescription");
const createError = require("../middlewares/error");
const { response } = require("express");

const addPrescription = async (req, res, next) => {
  try {
    const newPrescription = await Prescription.create(req.body);

    res
      .status(201)
      .json({ message: "Ordonnance créée avec succès", data: newPrescription });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.findAll();

    if (!prescriptions)
      return next(createError(404, "Aucune ordonnance trouvée"));

    res
      .status(200)
      .json({ message: "Toutes les ordonnances:", data: prescriptions });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByPk({
      where: { id: req.params.id },
    });

    if (!prescription) return next(createError(404, "Pas d'ordonnance trouvé"));

    res
      .status(200)
      .json({ message: "Ordonnance trouvé avec succès", data: prescription });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updatePrescription = async (req, res, next) => {
  try {
    const [updateRows] = await Prescription.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Pas d'ordonnance trouvé"));

    const updatedRows = await Prescription.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Ordonnance mise à jour avec succès",
      data: updatedRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deletePrescription = async (req, res, next) => {
  try {
    const deletedRows = await Prescription.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Pas d'ordonnance trouvé"));

    res.status(200).json({ message: "Ordonnace supprimé avec succès" });
  } catch (error) {
    next(createError(500, "erreur dans le serveur", error.message));
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
};
