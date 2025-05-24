const createError = require("../middlewares/error");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/index");
const { Clinic } = require("../models");

const signup = async (req, res, next) => {
  try {
    const { name, phoneNumber, password, role, clinicId } = req.body;

    // Vérify if req.body is correctly define
    if (!name || !phoneNumber || !password || !role || !clinicId) {
      return next(createError(400, "Tous les champs sont requis"));
    }

    // check if clinic exists
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) return next(createError(404, "Clinique non trouvée"));

    // Check if phoneNumber exists
    const existingNumber = await User.findOne({
      where: { phoneNumber },
    });

    if (existingNumber)
      return next(createError(409, "Ce numéro est déjà utilisé"));

    // check if user has auth to add
    if (req.user.role !== "admin" || req.user.clinicId !== clinicId)
      return next(
        createError(
          404,
          "Vous n'etes pas autorisé à ajouter des utilisateurs à cette clinique"
        )
      );

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phoneNumber,
      password: hashedPassword,
      role,
      clinicId,
    });

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", data: user });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { phoneNumber: req.body.phoneNumber },
    });

    // Check if user send required fields
    if (!req.body.phoneNumber || !req.body.password) {
      return next(
        createError(
          400,
          "Le numéro de téléphone et le mot de passe sont requis"
        )
      );
    }

    if (!user) return next(createError(404, "Aucun utilisateur trouvé"));

    // verify password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return next(createError(401, "Mot de passe incorrect"));

    // generate token
    const token = jwt.sign({ id: user.id, role: user.role }, ENV.TOKEN, {
      expiresIn: "24h",
    });

    // Send response without password
    const { password, ...userData } = user.dataValues;

    // create cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ message: "Connecté avec succès", userData });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) return next(createError(404, "Aucun utilisateur trouvé"));

    res.status(200).json({
      message: "Tous les utilisateurs trouvés avec succès",
      data: users,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return next(createError(404, "Aucun utilisateur trouvé"));

    res.status(200).json({ message: "Utilisateur trouvé", data: user });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const [updateRows] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucun utilisateur trouvé"));

    const updatedRows = await User.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "utilisateur mise à jour avec succès",
      data: updatedRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteRows = await User.destroy({
      where: { id: req.params.id },
    });

    if (deleteRows === 0)
      return next(createError(404, "Aucun utilisateur trouvé"));

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  signup,
  signin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
