var mongoose = require('mongoose');
var moment = require('moment');



var fruitSchema = mongoose.Schema({
    product: { type: String, required: true
    },
    quantity : { type: String, required: true
    },
    amount : { type: Number, required: true
    },
    damage : { type: String, default:null
    },
    assist_buyer : { type: String, default:null
    },
    confirmed_by : { type: String, required:true
    },
    remark : { type: String, default:null
    },
    paid_for : { type: String, default:null
    },
    size : [{ type: String, required: true 
    }],
    bottles : { type: Number, default:null
    },
    buyer : { type: String, required: true
    },
       kilo: { type: Number, required: true,
    },
        supplier: { type: String, required: true,
    },
        driver: { type: String, required: true,
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