import createError from "http-errors";

export const verifyAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next(createError(401));
    }
    next();
};
