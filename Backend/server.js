const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('App listening on port 3000');
        });
        db = getDb(); // Initialize db after connection is successful
    } else {
        console.log('Database connection error:', err);
    }
});
app.use('/api/contact_management', require('./routes/contact'));
