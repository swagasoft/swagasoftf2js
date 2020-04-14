var mongoose = require('mongoose');
var moment = require('moment');



var fruitSchema = mongoose.Schema({
    product: { type: String, required: true
    },
    quantity : { type: String, 
    },
    amount : { type: Number, 
    },
    damage : { type: String, 
    },
    assist_buyer : { type: String, default:null
    },
    confirmed_by : { type: String, 
    },
    remark : { type: String, default:null
    },
    paid_for : { type: String, default:null
    },
    size : { type: String, 
    },
    bottles : { type: Number, default:null
    },
    buyer : { type: String, 
    },
       kilo: { type: String, 
    },
        supplier: { type: String, 
    },
        driver: { type: String, 
    },
        admin: { type: String, required: true,
    },
    
    confirm: {
        type: Boolean, default: false,
    },
    
    verify: {
        type: Boolean, default: false,
    },
    edit : {
        type: Number,
        default: 0
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

     created_at: {
        type: Date,  
    },
    day : {
        type: String,  
    }

});

mongoose.model('fruit', fruitSchema);