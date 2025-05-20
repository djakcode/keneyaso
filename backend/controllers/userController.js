const createError = require("../middlewares/error");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/index");

const signup = async (req, res, next) => {
  try {
    const { name, phoneNumber, password, role } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(req.body, {
      name,
      phoneNumber,
      password: hashedPassword,
      role,
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
    const user = await User.findOne(req.body, {
      where: { phoneNumber: req.body.phoneNumber },
    });

    if (!user) return next(createError(404, "Aucun utilisateur trouvé"));

    // verify password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return next(createError(401, "Mot de passe incorrect"));

    // generate token
    const token = jwt.sign({ id: user.id }, ENV.TOKEN, { expiresIn: "24h" });

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
