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
    treated: { type: Boolean, default: false
    },

    confirm : {
        type: Boolean, default: false
    },

    verify : {
        type: Boolean, default: false
    },

    hide : {
        type: Boolean, default: false
    },

     created_at: {
        type: Date, required: true
    },
    day : {
        type: String,
    }
    ,
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

mongoose.model('penalty', penaltySchema);