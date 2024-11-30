const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB bağlantısı
mongoose
  .connect("mongodb://localhost:27017/your_database_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Routes
const financialDataRoutes = require("./routes/financialDataRoutes");
app.use("/api", financialDataRoutes);

// Server başlatma
const port = 5001;
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
