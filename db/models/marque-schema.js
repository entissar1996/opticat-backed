const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const marqueSchema = new Schema({
    label: { 
        type: String, 
        required: [true, 'label est obligatoire!!'] 
    },
    logo: { 
        type: String, 
        default:"marqued.jpg",
        required: [true, 'label est obligatoire!!'] 
    },
    products:[{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Product' 
    }],
});
module.exports = new mongoose.model('Marque', marqueSchema);