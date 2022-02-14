const express = require('express');
const router = express.Router();

const { index, redirect } = require('../controllers/index');

// routes
router.get('/', index);
router.get('/:urlId', redirect);

module.exports = router;
