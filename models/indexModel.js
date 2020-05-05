'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * MongoDB does not have a build in numeric incremental ID type, so I'm using a helper table for it.
 * A numeric ID is required for the "hashids" library to work properly
 */
const urlIndexSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model('Index', urlIndexSchema);
