const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
    {
        name :{
            type: String,
            required: true
        },
        description:
        {
            type: String
        },
        productsCount :{
            type:String,
            default : 0
        }
    },
        { timestamps : true}
    
);
module.exports = mongoose.model('Category' ,CategorySchema);