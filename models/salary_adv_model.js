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

     created_at: {    type: Date,
      
    },
    day : {   type: String, 
    }
    ,
    qDay :{  type:Number,
    },
    qMonth :{  type:Number, 
    },
    qYear :{  type:Number,
    }

});

mongoose.model('salary_adv', salary_Adv);