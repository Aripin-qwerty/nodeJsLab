export const webErrorHandler = (err, req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next(err);
  if (res.headersSent) return next(err);

  return res.status(err.statusCode || 500).render("error", {
    title: "Error",
    errorMessage: [
      {
        statusCode: err.statusCode || 500,
        message: err.message,
      },
    ],
  });
};
