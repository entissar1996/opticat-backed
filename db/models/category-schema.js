const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const categorySchema = new Schema({
    label: { 
        type: String, 
        required: [true, 'label est obligatoire!!'] 
    },
    products:[{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Product' 
    }],
});
module.exports = new mongoose.model('Category', categorySchema);