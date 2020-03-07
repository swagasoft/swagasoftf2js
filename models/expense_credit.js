const mongoose = require('mongoose');
var moment = require('moment');

var creditSchema = mongoose.Schema({
    balance: {
        type: Number,
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

mongoose.model('credit', creditSchema);