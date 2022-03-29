const express = require('express');
const router = express.Router();

const { shortenGuest, shortenUser } = require('../controllers/shorten');

// routes
router.post('/shorten-guest', shortenGuest);
router.post('/shorten-user', shortenUser);
module.exports = router;
