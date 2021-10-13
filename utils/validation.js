const { celebrate, Joi } = require('celebrate');
const { default: isURL } = require('validator/lib/isURL');
const BadRequestError = require('../errors/bad-request');
const { movieUrlError } = require('./errors');

const validateURL = (value) => {
  const valid = isURL(value, { require_protocol: true });
  if (valid) {
    return value;
  }
  throw new BadRequestError(movieUrlError);
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateUserForm = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
  }),
});

const validateUserCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUser,
  validateUserForm,
  validateUserCredentials,
  validateNewMovie,
  validateMovieId,
};
