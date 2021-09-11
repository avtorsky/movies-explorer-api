const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { minLengthValue, maxLengthValue } = require('../utils/config');
const { userEmailError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(string) {
        return isEmail(string);
      },
      message: userEmailError,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: minLengthValue,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: minLengthValue,
    maxlength: maxLengthValue,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
