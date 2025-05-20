const Pharmacy = require("../models/Pharmacy");
const createError = require("../middlewares/error");

const addPharmacy = async (req, res, next) => {
  try {
    const newPharmacy = await Pharmacy.create(req.body);

    res
      .status(201)
      .json({ message: "Pharmacy ajouté avec succès", data: newPharmacy });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPharmacies = async (req, res, next) => {
  try {
    const pharmacies = await Pharmacy.findAll();

    if (!pharmacies) return next(createError(404, "Aucune pharmacie trouvée"));

    res.status(200).json({ message: "Pharmacies trouvées ", data: pharmacies });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPharmacy = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findByPk({
      where: { id: req.params.id },
    });

    if (!pharmacy) return next(createError(404, "Pas de pharmacie trouvée"));

    res
      .status(200)
      .json({ message: "Pharmacie trouvée avec succès", data: pharmacy });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updatePharmacy = async (req, res, next) => {
  try {
    const [updateRows] = await Pharmacy.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Pas de pharmacie trouvée"));

    const updatedRows = await Pharmacy.findOne({
      where: { id: req.params.id },
    });

    res.json({
      message: "Pharmacie mise à jour avec succès",
      data: updatedRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deletePharmacy = async (req, res, next) => {
  try {
    const deleteRows = Pharmacy.destroy({
      where: { id: req.params.id },
    });

    if (deleteRows === 0)
      return next(createError(404, "Aucune pharmacie trouvée"));

    res
      .status(200)
      .json({ message: "Pharmacie supprimée avec succès", data: deleteRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addPharmacy,
  getPharmacies,
  getPharmacy,
  updatePharmacy,
  deletePharmacy,
};
