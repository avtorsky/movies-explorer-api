const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUser } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;
