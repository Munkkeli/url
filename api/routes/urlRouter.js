'use strict';
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/:hash', urlController.redirect);

module.exports = router;
