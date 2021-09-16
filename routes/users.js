const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserName } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateUserName, updateUser);

module.exports = router;
