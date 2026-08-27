const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`المسار غير موجود — ${req.originalUrl}`));
};

module.exports = notFound;
