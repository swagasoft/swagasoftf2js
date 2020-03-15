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
    attendant : {
        type: Number,
        required: true
    },
    admin : {
        type: String,
        required: true
    },
       outletCode: {
        type: String,
        required: true,
    },
    
    bottles: {
        type: Number,
        required: true,
    },
    confirm: {
        type: Boolean, default: false,
    },
    verify : {
        type: Boolean, default: false
    },

     edited: {
        type: Number, default: 0
    },
     created_at: {
        type: Date, 
    },
    day : {
        type: String,  
    },
    qDay :{
        type:Number, 
    },
    qMonth :{
        type:Number, 
    },
    qYear :{
        type:Number, 
    }

});

mongoose.model('merchant', merchantSchema);