const mongoose = require('mongoose');
//const Category = require('./db/models/category-schema');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: { 
      type: String,
      required: [true, 'label est obligatoire!!']
    },
    description: String,
    brand: String,

    price:   {
       type: Number, 
       //required: [true, 'price est obligatoire!!'], 
       min: 0 
      },
    quantity:{ 
      type: Number, 
      //required: [true, 'quantity est obligatoire!!']
    },
    photo: {
      type: String,
      default:"default.png",
      required:true
  },
  
    couleur:String,
    pricepromo:String,
    categories:[{ 
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    }],
    uploaded: { type: Date, default: Date.now },

  });

  module.exports = new mongoose.model('Product', productSchema);