// models/Company.js
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxId: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
