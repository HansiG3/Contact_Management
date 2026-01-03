const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

let db;

// ✅ API routes FIRST
app.use('/api/contacts', require('./routes/contact'));

// ✅ Serve frontend build (CRA)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Fallback for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ✅ Connect DB and start server
connectToDb((err) => {
  if (!err) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
    db = getDb();
  } else {
    console.log('Database connection error:', err);
  }
});
