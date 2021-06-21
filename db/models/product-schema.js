const mongoose = require('mongoose');
//const Category = require('./db/models/category-schema');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: { 
      type: String,
      required: [true, 'label est obligatoire!!']
    },
    description: { 
      type: String,
      required: [true, 'description est obligatoire!!']
    },
    brand:{ 
      type: mongoose.Types.ObjectId, 
      ref: 'Marque' ,
      //required: [true, 'quantity est obligatoire!!']
  },
    price:{
       type: Number, 
      // required: [true, 'price est obligatoire!!'], 
       min: 0 
    },
    quantity:{ 
      type: Number, 
     //required: [true, 'quantity est obligatoire!!']
    },
    photo: {
      type: String,
      default:"upload.png",
      required:true
    },
    color:{
      String,
     // required: [true, 'couleur est obligatoire!!']
    },
    pricepromo:{
      type:Number,
      //required: [true, 'price promo est obligatoire!!']
    },
    
    categories:[{ 
      type: mongoose.Types.ObjectId,
      ref: 'Category',
     // required: [true, 'categories est obligatoire!!']

    }],
    uploaded: { type: Date, default: Date.now },

  });

  module.exports = new mongoose.model('Product', productSchema);