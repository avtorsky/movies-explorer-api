const { codeServerError, internalServerError } = require('../utils/errors');

const serverErrorMiddleware = (err, req, res, next) => {
  const { statusCode = codeServerError, message } = err;
  const errorMessage = (statusCode === codeServerError) ? internalServerError : message;

  res.status(statusCode).send({ message: errorMessage });
  next();
};

module.exports = serverErrorMiddleware;
