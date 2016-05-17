'use strict';

const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  bandName: { type: String, required: true, unique: true },
  genre: { type: String, required: true }
});

module.exports = mongoose.model('Band', bandSchema);
