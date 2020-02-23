const mongoose = require('mongoose');

var expenseList = mongoose.Schema({
    balance: {
        type: Number,
    },
       description: {
        type: String,
        required: true,
    },

    amountPaid: {
        type: Number,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
        information: {
        type: String,
        required: true,
    }, 
     verified: {
        type: Boolean, default: false
    },

 product: {
        type: String,
        required: true,
    },

     created_at: {
        type: Date,
       required: true
    },

});

mongoose.model('expense_list', expenseList);