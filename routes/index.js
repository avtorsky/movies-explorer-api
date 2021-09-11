const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { validateUserCredentials } = require('../utils/validation');
const NotFoundError = require('../errors/not-found');
const { endpointCastError } = require('../utils/errors');

router.post('/signup', validateUserCredentials, createUser);
router.post('/signin', validateUserCredentials, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError(endpointCastError));
});

module.exports = router;
