const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title:
   { 
    type: String,
     required: true 
    },
  description: String,

  discountType: { 
    type: String,
     enum: ['percentage', 'fixed'],
      required: true 
    },
  discountValue: {
     type: Number,
      required: true
     },
  startDate: {
     type: String,
      required: true
     },
  endDate: { 
    type: String,
     required: true 
    },
  status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' },
  products: [String]
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
