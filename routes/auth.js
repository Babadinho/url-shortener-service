const express = require('express');

const router = express.Router();

//controllers
const { register, login, requireSignin } = require('../controllers/auth');

//routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
