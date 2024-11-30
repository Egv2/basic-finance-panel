// routes/financialDataRoutes.js
const express = require('express');
const router = express.Router();
const FinancialData = require('../models/FinancialData');
const multer = require('multer');

// Multer için dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Yeni mali veri ekleme
router.post('/financial-data', upload.single('file'), async (req, res) => {
  try {
    const newFinancialData = new FinancialData({
      ...req.body,
      files: req.file ? [{ fileName: req.file.originalname, filePath: req.file.path }] : []
    });

    const savedData = await newFinancialData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tüm mali verileri getirme
router.get('/financial-data', async (req, res) => {
  try {
    const financialData = await FinancialData.find().populate('relatedEntity');
    res.status(200).json(financialData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir mali veriyi güncelleme
router.put('/financial-data/:id', async (req, res) => {
  try {
    const updatedData = await FinancialData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Belirli bir mali veriyi silme
router.delete('/financial-data/:id', async (req, res) => {
  try {
    await FinancialData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Veri silindi.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
