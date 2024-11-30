// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxId: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
