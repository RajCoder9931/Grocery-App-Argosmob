const express = require('express');
const router = express.Router();
const Unit = require('../Models/Unit');
//  Create new unit
router.post('/', async (req, res) => {
  try {
    const { name, shortName, description } = req.body;
    const newUnit = new Unit({ name, shortName, description });
    const savedUnit = await newUnit.save();
    res.status(201).json(savedUnit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get all units
router.get('/', async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update unit
router.put('/:id', async (req, res) => {
  try {
    const updated = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Delete unit
router.delete('/:id', async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Unit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
