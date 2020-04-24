'use strict';
const mongoose = require('mongoose');
const Hashids = require('hashids/cjs');
const crypto = require('crypto');

const hashids = new Hashids('secret ;)', 4);

const Schema = mongoose.Schema;

/**
 * MongoDB does not have a build in numeric incremental ID type, so I'm using a helper table for it.
 * A numeric ID is required for the "hashids" library to work properly
 */
const urlIndexSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Index = mongoose.model('Index', urlIndexSchema);

const urlSchema = new Schema({
  _id: Number,
  hash: { type: String, index: true, unique: true },
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  password: String,
  isObscured: Boolean,
  expiresAt: Date,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

/**
 * Before actually saving the document, get a numeric ID and calculate the hash
 * NOTE: We don't actually get the document in the pre save hook, so I'm using the post validate hook instead
 */
urlSchema.post('validate', (doc, next) => {
  Index.findByIdAndUpdate(
    { _id: 'urlIndex' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    (error, index) => {
      if (error) return next(error);

      doc._id = index.seq;
      doc.hash = hashids.encode(doc._id);

      if (doc.isObscured) {
        doc.hash = crypto
          .createHash('sha256')
          .update(doc.hash, 'utf-8')
          .digest('hex');
      }

      next();
    }
  );
});

module.exports = mongoose.model('URL', urlSchema);
