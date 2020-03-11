const mongoose = require('mongoose');
var moment = require('moment');
var today = moment(moment().format('YYYY-MM-DD')).toDate();

var salary_Adv = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    }, 
    edit : {
        type: Number,
        default: 0
    },
       reason: {
        type: String,
        required: true,
    },
       user_id: {
        type: String,
        required: true,
    },
       admin: {
        type: String,
        required: true,
    },


     created_at: {
        type: Date,
       default: Date.now()
    },
    day : {
        type: String,   default:moment().format('l')
    }
    ,
    qDay :{
        type:Number, default: new Date().getDate(Date.now)
    },
    qMonth :{
        type:Number, default: new Date().getMonth(Date.now)
    },
    qYear :{
        type:Number, default: new Date().getFullYear(Date.now)
    }

});

mongoose.model('salary_adv', salary_Adv);