const mongoose = require('mongoose');

var creditSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
   
     created_at: {
        type: Date,
        default : Date.now()
    },

});

mongoose.model('credit', creditSchema);