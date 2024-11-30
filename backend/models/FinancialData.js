// models/FinancialData.js
const mongoose = require('mongoose');

const FinancialDataSchema = new mongoose.Schema({
  firmName: { type: String, required: true },
  taxId: { type: String, required: true },
  userDescription: { type: String },
  category: { type: String, enum: ['company', 'supplier', 'customer'], required: true },
  relatedEntity: { type: mongoose.Schema.Types.ObjectId, refPath: 'category' },
  reportPeriod: { type: { month: Number, year: Number }, required: true },
  files: [{ fileName: String, filePath: String }]
}, { timestamps: true });

module.exports = mongoose.model('FinancialData', FinancialDataSchema);
