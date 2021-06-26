const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    right:{sph:Number,cyl:Number,axe:Number,add:Number,eq:Number,eq_depres:Number},
    left:{sph:Number,cyl:Number,axe:Number,add:Number,eq:Number,eq_depres:Number}

});

module.exports = mongoose.model('Order', OrderSchema);