const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

// Create Product - POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, description, unit } = req.body;

    if (!name || !category || price == null || stock == null || !unit) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const product = new Product({ name, category, price, stock, description, unit });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ error: 'Internal server error while saving product' });
  }
});

// Get All Products - GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error while fetching products' });
  }
});

// Get Product by ID - GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Internal server error while fetching product' });
  }
});

// Update Product - PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const { name, category, price, stock, description, unit } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, stock, description, unit },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error while updating product' });
  }
});

// Delete Product - DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error while deleting product' });
  }
});

module.exports = router;
