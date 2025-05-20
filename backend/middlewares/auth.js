const jwt = require("jsonwebtoken");
const ENV = require("../config");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  // check is token is present in the request
  const token = req.cookies.access_token;

  // if token is not present, return error
  if (!token) return next(createError(401, "Vous n'etes pas autorisé"));

  // verify token
  jwt.verify(token, ENV.TOKEN, (err, user) => {
    if (err) return next(createError(403, "Token pas valide")); // if token is invalid return error 403 for forbidden

    req.user = user; // Set user in request object
    next();
  });
};

module.exports = verifyToken;
