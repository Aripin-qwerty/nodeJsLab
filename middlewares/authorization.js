import createError from "http-errors";

export const requiredRole = (role) => {
  return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
          return next(createError(403));
        }
        next();
  };
};
