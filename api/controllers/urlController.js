'use strict';
const URL = require('../models/urlModel');
const matomo = require('../utils/matomo');

const minify = async (
  req,
  { url, password, isObscured, isMine, expiresAt }
) => {
  matomo.trackUrlCreate(req, url);

  const _user = isMine && req.user ? req.user._id : undefined;

  return URL.create({
    _user,
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
