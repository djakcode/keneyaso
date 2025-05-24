const jwt = require("jsonwebtoken");
const ENV = require("../config");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  try {
    // Get token in cookies
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, "Vous n'êtes pas autorisé"));
    }

    // verify token
    jwt.verify(token, ENV.TOKEN, (err, decoded) => {
      if (err) {
        return next(createError(403, "Token invalide ou expiré"));
      }

      req.user = decoded; // add decoded datas token to req.user
      next();
    });
  } catch (error) {
    next(createError(500, "Erreur interne du serveur", error.message));
  }
};

module.exports = verifyToken;
