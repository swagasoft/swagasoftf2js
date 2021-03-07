var mongoose = require('mongoose');
var moment = require('moment');



var merchantSchema = mongoose.Schema({
    amountSold: {
        type: Number,
        required: true
    },
    merchantName : {
        type: String,
        required: true
    },
    outlet : {
        type: String,
        required: true
    },
    m_rate :{
        type:Number, 
    }

});

mongoose.model('merchant_pro', merchantSchema);