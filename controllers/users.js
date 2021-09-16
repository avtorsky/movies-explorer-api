const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  userValidationError,
  userCastError,
  userCredentialsError,
  userConflictError,
} = require('../utils/errors');
const {
  maxAgeValue,
  codeStatusOk,
  codeStatusCreated,
  userLogOut,
} = require('../utils/config');
const BadRequestError = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(userCastError));
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(userCastError));
      }
      return next(err);
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
        return next(new NotFoundError(userCastError));
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(userValidationError));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(userCastError));
      } if (err.code === 11000) {
        return next(new ConflictError(userConflictError));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError(userConflictError));
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
        return next(new BadRequestError(userValidationError));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(userCredentialsError));
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return next(new UnauthorizedError(userCredentialsError));
          }
          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' });
          return res.cookie('token', token, {
            httpOnly: true,
            maxAge: maxAgeValue,
            secure: true,
            sameSite: 'none',
          }).status(codeStatusCreated).send({ token });
        });
    })
    .catch(next);
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
