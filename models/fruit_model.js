var mongoose = require('mongoose');
var moment = require('moment');



var fruitSchema = mongoose.Schema({
    product: { type: String, required: true
    },
    very_big : { type: Number, required: true
    },
    big : { type: Number, required: true
    },
       medium: { type: Number, required: true,
    },
       small: { type: Number, required: true,
    },
       very_small: { type: Number, required: true,
    },
       amount: { type: Number, required: true,
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

     created_at: {
        type: Date, default: Date.now()
    },
    day : {
        type: String,   default:moment().format('l')
    }

});

mongoose.model('fruit', fruitSchema);