const express = require('express');
const router = express.Router();

const { shorten } = require('../controllers/shorten');

// routes
router.post('/shorten', shorten);

module.exports = router;
