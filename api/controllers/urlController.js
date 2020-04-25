'use strict';
const URL = require('../models/urlModel');

const redirect = async (req, res, next) => {
  if (!req.params.hash) return next();

  const record = await URL.findOne({ hash: req.params.hash });
  if (!record) return next();

  // TODO: Log some stats here

  return res.redirect(record.url);
};

module.exports = {
  redirect,
};
