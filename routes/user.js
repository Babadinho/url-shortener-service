const express = require('express');

const router = express.Router();

//controllers
const { getUser, getUserUrls, editUrl } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/user/:userId', requireSignin, getUser);
router.get('/urls/:userId', requireSignin, getUserUrls);
router.post('/edit-url', requireSignin, editUrl);

module.exports = router;
