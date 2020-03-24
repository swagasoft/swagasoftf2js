const mongoose = require('mongoose');
var moment = require('moment');

var expenseTwo = mongoose.Schema({
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
     confirm: {
        type: Boolean, default: false
    },


 product: {
        type: String,
        required: true,
    },
 return: {
        type: Boolean, default: false
        
    },

     created_at: {
        type: Date
    },
    
    qDay :{
        type:Number, 
    },
    qMonth :{
        type:Number,
    },
    qYear :{
        type:Number
    },
    day : {
     type: String,  required:true
  },

});

mongoose.model('expense_two', expenseTwo);