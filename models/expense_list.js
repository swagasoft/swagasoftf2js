const mongoose = require('mongoose');
var moment = require('moment');

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
     confirm: {
        type: Boolean, default: false
    },

     edit: {
        type: Number, default: 0
    },

 product: {
        type: String,
        required: true,
    },
 return: {
        type: Boolean, default: false
        
    },

     created_at: {
        type: Date, default:Date.now()
    },
    
    qDay :{
        type:Number, default: new Date().getDate(Date.now)
    },
    qMonth :{
        type:Number, default: new Date().getMonth(Date.now) + 1
    },
    qYear :{
        type:Number, default: new Date().getFullYear(Date.now)
    },
    day : {
     type: String,   default:moment().format('l')
  },

});

mongoose.model('expense_list', expenseList);