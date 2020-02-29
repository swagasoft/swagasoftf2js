const mongoose = require('mongoose');

var supplyList = mongoose.Schema({
    pineapple: {
        type: Number,
        required: true,
    },
       tigernut: {
        type: Number,
        required: true,
    },
    watermelon: {
        type: Number,
        required: true,
    },
    carrot: {
        type: Number,
        required: true,
    },
    orange: {
        type: Number,
        required: true,
    },
    sugarcane: {
        type: Number,
        required: true,
    },
        slg: {
        type: Number,
        required: true,
    }, 
     admin: {
        type: String, required: true
    },

 prod_id: {
        type: String,
        required: true,
    },
 outlet: {
        type: String,
        required: true,
    },
     axis: {
        type: String,
        required: true,
    },

     created_at: {
        type: Date,default:Date.now()
       
    },

});

mongoose.model('supply_list', supplyList);