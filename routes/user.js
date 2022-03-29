const express = require('express');

const router = express.Router();

//controllers
const { getUser, getUserUrls } = require('../controllers/user');

//routes
router.get('/user/:userId', getUser);
router.get('/urls/:userId', getUserUrls);

module.exports = router;
