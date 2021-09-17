const rateLimit = require('express-rate-limit');
const { serverThrottlingError } = require('./errors');

const JWT_SECRET_DEV = 'dev-secret';
const MONGO_URL_DEV = 'MONGO_URL=mongodb://localhost:27017/moviesdb';

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: serverThrottlingError,
});

const minLengthValue = 2;
const maxLengthValue = 30;
const maxAgeValue = 3600000 * 24 * 7;

const codeStatusOk = 200;
const codeStatusCreated = 201;

const userLogOut = 'Cессия пользователя завершена.';
const movieDeleted = 'Фильм удалён из избранного.';

module.exports = {
  JWT_SECRET_DEV,
  MONGO_URL_DEV,
  mongooseConfig,
  limiter,
  minLengthValue,
  maxLengthValue,
  maxAgeValue,
  codeStatusOk,
  codeStatusCreated,
  userLogOut,
  movieDeleted,
};
