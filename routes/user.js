const express = require('express');

const router = express.Router();

//controllers
const { getUser, getUserUrls, editUrl } = require('../controllers/user');

//routes
router.get('/user/:userId', getUser);
router.get('/urls/:userId', getUserUrls);
router.post('/edit-url', editUrl);

module.exports = router;
