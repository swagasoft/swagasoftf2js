const mongoose = require('mongoose');
var moment = require('moment');

var supplyList = mongoose.Schema({
    //  supply
    pineapple: { type: Number, default:0,
    },
       tigernut: { type: Number, default:0,
    },
    watermelon: { type: Number, default:0,
    },
    carrot: { type: Number, default:0,
    },
    orange: { type: Number, default: 0,
    },
    sugarcane: { type: Number, default:0,
    },
        slg: { type: Number, default:0,
    }, 

    //  sample
    p_samp: { type: Number, default:0
    },
       t_samp: { type: Number, default:0,
    },
    w_samp: { type: Number, default:0,
    },
    c_samp: { type: Number, default:0,
    },
    o_samp: { type: Number, default:0,
    },
    s_samp: { type: Number, default:0,
    },
        slg_samp: { type: Number,default:0,
    },
    // exchange
    p_exg: {type:Number, default:0},
    o_exg: {type:Number, default:0},
    w_exg: {type:Number, default:0},
    t_exg: {type:Number, default:0},
    c_exg: {type:Number, default:0},
    s_exg: {type:Number, default:0},
    slg_exg: {type:Number, default:0},

    // return
    p_return: {type:Number, default:0},
    o_return: {type:Number, default:0},
    w_return: {type:Number, default:0},
    t_return: {type:Number, default:0},
    c_return: {type:Number, default:0},
    s_return: {type:Number, default:0},
    slg_return: {type:Number, default:0},

    rate_p:{type:Number, required: true},
    rate_o:{type:Number, required: true},
    rate_w:{type:Number, required: true},
    rate_t:{type:Number, required: true},
    rate_c:{type:Number, required: true},
    rate_s:{type:Number, required: true},
    rate_slg:{type:Number, required: true},

  
     admin: {  type: String, required: true
    },
    edit:{type:Number, default:0},

 prod_id: { type: String, required: true,
    },
 outlet: {  type: String, required: true,
    },
     location: { type: String,  required: true,
    },
    
    qDay :{
      type:Number, required: true
  },
  qMonth :{
      type:Number, required: true
  },
  qYear :{
      type:Number, 
  },
  confirm:{type:Boolean, default: false},
  verify:{type:Boolean, default: false},
  day : {
   type: String, required: true
},
     created_at: {
        type: Date, required :true
       
    },

});

mongoose.model('supply_list', supplyList);