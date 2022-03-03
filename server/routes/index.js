const express = require('express');
const router = express.Router();

const { redirect, stats } = require('../controllers/index');

// routes
router.get('/:urlId', redirect);
router.post('/stats', stats);

module.exports = router;
