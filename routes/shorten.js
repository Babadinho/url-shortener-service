const express = require('express');
const router = express.Router();

const { shortenGuest, shortenUser } = require('../controllers/shorten');
const { requireSignin } = require('../controllers/auth');

// routes
router.post('/shorten-guest', shortenGuest);
router.post('/shorten-user', requireSignin, shortenUser);
module.exports = router;
