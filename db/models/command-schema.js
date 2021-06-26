const mongoose = require('mongoose');
const CommandSchema = mongoose.Schema({
    idPanier: {
        type: mongoose.Types.ObjectId, 
        ref: 'Panier'  
    },
    prixCommand:  {
        type: Number, 
       required: [true, 'price est obligatoire!!'], 
       min: 0 
    },
    

});

module.exports = mongoose.model('Command', CommandSchema);