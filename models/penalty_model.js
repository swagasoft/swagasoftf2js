var mongoose = require('mongoose');
var moment = require('moment');



var penaltySchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
       reason: {
        type: String,
        required: true,
    },
    
    admin: {
        type: String,
        required: true,
    },
    wave: {
        type: Boolean, default: false,
    },
    edit : {
        type: Number,
        default: 0
    },

     created_at: {
        type: Date, default: Date.now()
    },
    day : {
        type: String,   default:moment().format('l')
    }
    ,
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

mongoose.model('penalty', penaltySchema);