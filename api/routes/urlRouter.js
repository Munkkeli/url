'use strict';
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

module.exports = (io) => {
  router.get('/:hash', urlController.redirect(io));

  return router;
};
