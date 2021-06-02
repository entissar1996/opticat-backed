const mongoose = require('mongoose');
//const Category = require('./db/models/category-schema');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: { 
      type: String,
      //required: [true, 'label est obligatoire!!']
    },
    description: String,
    price:   {
       type: Number, 
       //required: [true, 'price est obligatoire!!'], 
       min: 0 
      },
    quantity:{ 
      type: Number, 
      //required: [true, 'quantity est obligatoire!!']
    },
    photo: String,
    categories:[{ 
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    }],
  });

  module.exports = new mongoose.model('Product', productSchema);