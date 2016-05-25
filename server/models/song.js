'use strict';

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String },
  bandName: { type: String, default: 'a rock band' }
});

module.exports = mongoose.model('Song', songSchema);
