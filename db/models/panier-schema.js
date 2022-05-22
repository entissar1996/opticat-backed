const mongoose = require('mongoose');
const PanierSchema = mongoose.Schema({
    idUser:{
        type: mongoose.Types.ObjectId, 
        ref: 'User'  
    },
    color:  {
        type: Array, 
    },
    quantity:  {
        type: Number, 
       min: 1
    },
    idProduct: {
        type: mongoose.Types.ObjectId, 
        ref: 'Product'  
    },
    TypeGlass:  {
        type: String, 
    },
    idOrder: {
        type: mongoose.Types.ObjectId, 
        ref: 'Order'  
    },
    verre:{
        type: mongoose.Types.ObjectId, 
        ref: 'Product'
    },
    teintes:  {
        type: String, 
    },
    prixTotal:  {
        type: Number, 
       min: 0 
    },
    

});

module.exports = mongoose.model('Panier', PanierSchema);