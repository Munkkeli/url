'use strict';
const URL = require('../models/urlModel');
const matomo = require('../utils/matomo');

const minify = async (req, { url, password, isObscured, expiresAt }) => {
  matomo.trackUrlCreate(req, url);

  return URL.create({
    url,
    password,
    isObscured: isObscured === true,
    expiresAt,
  });
};

const redirect = async (req, res, next) => {
  if (!req.params.hash) return next();

  const record = await URL.findOne({ hash: req.params.hash });
  if (!record) return next();

  matomo.trackUrlVisit(req, record.url, record.hash);

  return res.redirect(record.url);
};

module.exports = {
  minify,
  redirect,
};
