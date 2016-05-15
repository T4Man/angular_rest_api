'use strict';

const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  bandName: { type: String, required: true },
  genre: { type: String, default: 'Rock' }
});

module.exports = mongoose.model('Band', bandSchema);
