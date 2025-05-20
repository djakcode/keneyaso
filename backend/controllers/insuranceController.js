const Insurance = require("../models/Insurance");
const createError = require("../middlewares/error");

const addInsurance = async (req, res, next) => {
  try {
    const newInsurance = await Insurance.create(req.body);

    res
      .status(201)
      .json({ message: "Assurance créée avec succès", data: newInsurance });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getInsurances = async (req, res, next) => {
  try {
    const insurances = await Insurance.findAll();

    if (!insurances) return next(createError(404, "Aucune assurance trouvée"));

    res
      .status(200)
      .json({ message: "Assurances trouvées avec succès", data: insurances });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getInsurance = async (req, res, next) => {
  try {
    const insurance = await Insurance.findByPk({
      where: { id: req.params.id },
    });

    if (!insurance) return next(createError(404, "Aucune assurance trouvée"));

    res
      .status(200)
      .json({ message: "Assurance trouvée avec succès", data: insurance });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateInsurance = async (req, res, next) => {
  try {
    const [updateRows] = await Insurance.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucune assurance trouvée"));

    const updatedRows = await Insurance.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Assurance mise à jour avec succès",
      data: updatedRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteInsurance = async (req, res, next) => {
  try {
    const deletedRows = await Insurance.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Aucune assurance trouvée"));

    res.status(200).json({ message: "Assurance supprimée avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addInsurance,
  getInsurances,
  getInsurance,
  updateInsurance,
  deleteInsurance,
};
