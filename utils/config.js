require('dotenv').config();
const rateLimit = require('express-rate-limit');
const { serverThrottlingError } = require('./errors');

const {
  PORT = 3000,
  JWT_SECRET,
  MONGO_URL,
  NODE_ENV,
} = process.env;

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
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb',
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
