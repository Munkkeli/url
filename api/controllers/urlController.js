'use strict';
const URL = require('../models/urlModel');
const matomo = require('../utils/matomo');
const parse = require('../utils/parse');

const minify = async (
  req,
  { url, password, isObscured, isMine, expiresAt }
) => {
  matomo.trackUrlCreate(req, url);

  const _user = isMine && req.user ? req.user._id : undefined;

  const record = await URL.create({
    _user,
    url,
    password,
    isObscured: isObscured === true,
    expiresAt,
  });

  if (!record) throw new Error('Unable to create a record');

  // Set the title asynchronous
  parse
    .title(url)
    .then((title) => URL.updateOne({ _id: record._id }, { title }));

  return record;
};

const redirect = async (req, res, next) => {
  if (!req.params.hash) return next();

  const record = await URL.findOne({ hash: req.params.hash });
  if (!record) return next();

  matomo.trackUrlVisit(req, record.url, record.hash);

  return res.redirect(record.url);
};

const list = async (req) => {
  if (!req.user) throw new Error('Not authorized');

  return URL.find({ _user: req.user._id });
};

const remove = async (req, { hash }) => {
  if (!req.user) throw new Error('Not authorized');

  const record = await URL.findOne({ hash, _user: req.user._id });
  if (!record) throw new Error('Not authorized');

  await URL.deleteOne({ hash });

  return { success: true };
};

module.exports = {
  minify,
  redirect,
  list,
  remove,
};
