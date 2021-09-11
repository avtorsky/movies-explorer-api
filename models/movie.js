const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { movieUrlError } = require('../utils/errors');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(string) {
        return isURL(string);
      },
      message: movieUrlError,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(string) {
        return isURL(string);
      },
      message: movieUrlError,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(string) {
        return isURL(string);
      },
      message: movieUrlError,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
