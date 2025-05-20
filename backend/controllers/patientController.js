const Patient = require("../models/Patient");
const createError = require("../middlewares/error");

const addPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);

    res
      .status(201)
      .json({ message: "Patient ajouté avec succès", data: newPatient });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();

    if (!patients) return next(createError(404, "Pas de patient trouvé"));

    res
      .status(200)
      .json({ message: "Tous les patients trouvés", data: patients });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk({
      where: { id: req.params.id },
    });

    if (!patient) return next(createError(404, "Aucun patient trouvé"));

    res
      .status(200)
      .json({ message: "Patient trouvé avec succès", data: patient });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const [updateRows] = await Patient.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0) return next(createError(404, "Aucun patient trouvé"));

    const updatedRows = await Patient.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Patient mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const deletedPatient = await Patient.destroy({
      where: { id: req.params.id },
    });

    // check if patient exist
    if (deletedPatient === 0)
      return next(createError(404, "Aucun patient trouvé"));

    res.status(200).json({ message: "Patient supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
