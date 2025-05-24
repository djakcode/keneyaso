const createError = require("./error");

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const { role, clinicId } = req.user?.role; // make sure that role is in req.user

    if (!role || !clinicId || role !== requiredRole)
      return next(createError(403, "Accès réfusé pour cet utilisateur"));

    next();
  };
};

module.exports = checkRole;
