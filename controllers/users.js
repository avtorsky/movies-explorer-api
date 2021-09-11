const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  userValidationError,
  userCastError,
  userAuthError,
  userConflictError,
} = require('../utils/errors');
const {
  maxAgeValue,
  codeStatusOk,
  codeStatusCreated,
  userLogOut,
  JWT_SECRET,
} = require('../utils/config');
const BadRequestError = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

const getUser = (req, res, next) => {
  User.findById(req.user._id).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCastError);
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userCastError);
      }
      next();
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCastError);
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(userValidationError);
      } if (err.name === 'CastError') {
        throw new BadRequestError(userCastError);
      } if (err.code === 11000) {
        throw new ConflictError(userConflictError);
      }
      next();
    });
};

const createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError(userValidationError);
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(userConflictError));
      } return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => res.status(codeStatusCreated).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(userValidationError);
      }
      next();
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(codeStatusOk)
        .cookie('token', token, {
          httpOnly: true,
          maxAge: maxAgeValue,
          secure: true,
          sameSite: 'none',
        })
        .send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(userAuthError));
    });
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: userLogOut });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
};
