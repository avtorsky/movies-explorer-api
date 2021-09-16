const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const { movieValidationError, movieAuthError, movieCastError } = require('../utils/errors');
const { codeStatusOk, codeStatusCreated, movieDeleted } = require('../utils/config');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(codeStatusOk).send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(codeStatusCreated).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(movieValidationError));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(movieCastError));
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        return next(new ForbiddenError(movieAuthError));
      }
      return movie.remove()
        .then(() => {
          res.status(codeStatusOk).send({ message: movieDeleted });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(movieCastError));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
