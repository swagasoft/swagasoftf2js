const mongoose = require('mongoose');
var moment = require('moment');

var creditSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
    admin: {type: String, required: true },
   
     created_at: {
        type: Date,
        default : Date.now()
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

mongoose.model('credit', creditSchema);