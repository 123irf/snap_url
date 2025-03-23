const express = require('express');
const router = express.Router();
const { generateShortId } = require('../controllers/url.js');

router.post('/', generateShortId); 
module.exports = router;
