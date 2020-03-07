const mongoose = require('mongoose');
var moment = require('moment');

var balanceSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
     name: {
        type: String,
        required: true,
    },
     created_at: {
        type: Date,
        default : Date.now()
    },
    day : {
        type: String,   default:moment().format('l')
    }

});

mongoose.model('account', balanceSchema);