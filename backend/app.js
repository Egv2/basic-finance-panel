// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Yüklenen dosyaları sunucuda statik olarak hizmet etmek için

// MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/scorist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Router
const financialDataRoutes = require('./routes/financialDataRoutes');
app.use('/api', financialDataRoutes);

// Sunucu Başlatma
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
