const Appointment = require("../models/Appointment");
const createError = require("../middlewares/error");

const addAppointment = async (req, res, next) => {
  try {
    const newAppointment = await Appointment.create(req.body);

    res.status(201).json({
      message: "Rendez-vous ajouté avec succès",
      data: newAppointment,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll();

    if (!appointments) return next(createError(404, "Pas de rendez-vous"));

    res
      .status(200)
      .json({ message: "Tous les RDV trouvés", data: appointments });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByPk({
      where: { id: req.params.id },
    });

    if (!appointment) return next(createError(404, "Pas de RDV trouvé"));

    res
      .status(200)
      .json({ message: "RDV trouvé avec succès ", data: appointment });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const [updateRows] = await Appointment.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Pas de rendez-vous terouvé"));

    const updatedRows = await Appointment.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({
        message: "Rendez-vous mise à jour avec succès",
        data: updatedRows,
      });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const deletedRows = await Appointment.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) return next(createError(404, "Pas de RDV trouvé"));

    res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
