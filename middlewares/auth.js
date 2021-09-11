const jwt = require('jsonwebtoken');
const { userAuthError, endpointAuthError } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(userAuthError);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ForbiddenError(endpointAuthError);
  }

  req.user = payload;

  next();
};
