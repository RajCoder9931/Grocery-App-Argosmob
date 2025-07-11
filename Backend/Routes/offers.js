const express = require('express');
const router = express.Router();
const Offer = require('../Models/Offer');

// POST: Create a new offer
router.post('/', async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update an offer
router.put('/:id', async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOffer) return res.status(404).json({ error: 'Offer not found' });
    res.json(updatedOffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete an offer
router.delete('/:id', async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
