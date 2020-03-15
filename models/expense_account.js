const mongoose = require('mongoose');
var moment = require('moment');

var balanceSchema = mongoose.Schema({
    balance: { type: Number,required: true,
    },
     name: { type: String, required: true,
    },
     created_at: { type: Date, 
    },
    
    qDay :{
        type:Number, 
    },
    qMonth :{
        type:Number, 
    },
    qYear :{
        type:Number, 
    },
    day : {
     type: String, 
  },

});

mongoose.model('account', balanceSchema);