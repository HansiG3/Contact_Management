const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectToDb } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/contacts', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Database connection error:', err);
  }
});
