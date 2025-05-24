const Clinic = require("../models/Clinic");
const createError = require("../middlewares/error");
const { User } = require("../models");

const createClinic = async (req, res, next) => {
  try {
    const { name, address, userId } = req.body;

    // check if user existe and is doctor or admin
    const user = await User.findByPk(userId);
    if (!user || (user.role !== "doctor" && user.role !== "admin"))
      return next(
        createError(
          403,
          "Seul un médecin ou administrateur peut créer une clinique."
        )
      );

    // create clinic
    const clinic = await Clinic.create({ name, address });
    // link clinic to user
    user.clinicId = clinic.id;
    await user.save();

    res
      .status(201)
      .json({ message: "Clinique créée avec succès", data: clinic });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.findAll();

    if (!clinics) return next(createError(404, "Aucune clinique trouvée"));

    res
      .status(200)
      .json({ message: "Listes des cliniques trouvées", data: clinics });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findByPk(req.params.id);

    if (!clinic) return next(createError(404, "Clinique non trouvée"));

    res
      .status(200)
      .json({ message: "Clinique trouvée avec succès", data: clinic });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateClinic = async (req, res, next) => {
  try {
    const [updateRows] = await Clinic.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucune clinique trouvée"));

    const updatedRows = await Clinic.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Clinique mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteClinic = async (req, res, next) => {
  try {
    const deletedRows = await Clinic.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Clinique non trouvée"));

    res.status(200).json({ message: "Clinique supprimée avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createClinic,
  getClinics,
  getClinic,
  updateClinic,
  deleteClinic,
};
