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
        type: Date, default: Date.now()
    },
    day : {
        type: String,   default:moment().format('l')
    },
    qDay :{
        type:Number, default: new Date().getDate(Date.now)
    },
    qMonth :{
        type:Number, default: new Date().getMonth(Date.now) + 1
    },
    qYear :{
        type:Number, default: new Date().getFullYear(Date.now)
    }

});

mongoose.model('merchant', merchantSchema);