'use strict';
const URL = require('../models/urlModel');
const Index = require('../models/indexModel');
const matomo = require('../utils/matomo');
const parse = require('../utils/parse');

const minify = async (
  req,
  { url, password, isObscured, isMine, expiresAt },
  io
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

  // Set the title asynchronously
  parse
    .title(url)
    .then((title) => URL.updateOne({ _id: record._id }, { title }));

  // Set the stats asynchronously
  Index.findByIdAndUpdate(
    { _id: 'minifiedIndex' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  ).then((record, error) => {
    if (!error) {
      io.emit('minifiedIndex', record.seq);
    }
  });

  return record;
};

const redirect = (io) => async (req, res, next) => {
  if (!req.params.hash) return next();

  const record = await URL.findOne({ hash: req.params.hash });
  if (!record) return next();

  matomo.trackUrlVisit(req, record.url, record.hash);

  // Set the stats asynchronously
  Index.findByIdAndUpdate(
    { _id: 'visitedIndex' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  ).then((record, error) => {
    if (!error) {
      io.emit('visitedIndex', record.seq);
    }
  });

  return res.redirect(record.url);
};

const list = async (req) => {
  if (!req.user) throw new Error('Not authorized');

  return URL.find({ _user: req.user._id });
};

const update = async (req, { hash, url }) => {
  if (!req.user) throw new Error('Not authorized');

  const record = await URL.updateOne({ hash, _user: req.user._id }, { url });
  if (!record) throw new Error('Not authorized');

  return { success: true };
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
  update,
};
