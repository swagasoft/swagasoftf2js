const mongoose = require('mongoose');

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

});

mongoose.model('account', balanceSchema);