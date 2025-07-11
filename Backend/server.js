const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

// Import routes
const authRoutes = require('./Routes/auth');
const productRoutes = require('./Routes/productRoutes'); //  NEW
const categoryRoutes = require('./Routes/categories');
const unitRoutes = require('./Routes/Unit');
const offerRoutes = require('./Routes/offers');
const orderRoutes = require( './Routes/orders.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' DB connection failed:', err.message));

// Mount routes
app.use('/api/auth', authRoutes);               //  Login route
app.use('/api/products', productRoutes);        //  Products  route
app.use('/api/categories', categoryRoutes);     // category  route
app.use('/api/units', unitRoutes);              // units  route
app.use('/api/offers', offerRoutes);            // offers  route
app.use('/api/orders', orderRoutes);             // orders  route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
