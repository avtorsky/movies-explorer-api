const jwt = require('jsonwebtoken');
const { userAuthError, endpointAuthError } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden');
const { JWT_SECRET_DEV } = require('../utils/config');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new UnauthorizedError(userAuthError));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new ForbiddenError(endpointAuthError));
  }

  req.user = payload;

  return next();
};
