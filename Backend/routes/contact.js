const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// POST contact
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('contacts').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE contact (bonus)
router.delete('/:id', async (req, res) => {
  const { ObjectId } = require('mongodb');
  const db = getDb();
  await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
