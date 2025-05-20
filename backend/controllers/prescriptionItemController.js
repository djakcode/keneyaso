const PrescriptionItem = require("../models/PrescriptionItem");
const createError = require("../middlewares/error");

const addPrescriptionItem = async (req, res, next) => {
  try {
    const newPrescriptionItem = await PrescriptionItem.create(req.body);

    res.status(201).json({
      message: "Medicament ajouté avec succès",
      data: newPrescriptionItem,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPrescriptionItems = async (req, res, next) => {
  try {
    const prescriptionItems = await PrescriptionItem.findAll();

    if (!prescriptionItems)
      return next(createError(404, "Pas de medicament trouvé"));

    res.status(200).json({
      message: "Medicaments trouvés avec succès",
      data: prescriptionItems,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPrescriptionItem = async (req, res, next) => {
  try {
    const prescriptionItem = await PrescriptionItem.findByPk({
      where: { id: req.params.id },
    });

    if (!prescriptionItem)
      return next(createError(404, "Pas de medicament trouvé"));

    res.status(200).json({
      message: "Medicament trouvé avec succès",
      data: prescriptionItem,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updatePrescriptionItem = async (req, res, next) => {
  try {
    const [updateRows] = await PrescriptionItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Pas de medicament trouvé"));

    const updatedRows = await PrescriptionItem.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Medicament mise à jour avec succès",
      data: updatedRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deletePrescriptionItem = async (req, res, next) => {
  try {
    const deletedRows = await PrescriptionItem.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Pas de medicament trouvé"));

    res.status(200).json({ message: "Medicament supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addPrescriptionItem,
  getPrescriptionItems,
  getPrescriptionItem,
  updatePrescriptionItem,
  deletePrescriptionItem,
};
