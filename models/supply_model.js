const mongoose = require('mongoose');
var moment = require('moment');

var supplyList = mongoose.Schema({
    pineapple: { type: Number, required: true,
    },
       tigernut: { type: Number, required: true,
    },
    watermelon: { type: Number, required: true,
    },
    carrot: { type: Number, required: true,
    },
    orange: { type: Number, required: true,
    },
    sugarcane: { type: Number, required: true,
    },
        slg: { type: Number, required: true,
    }, 

    p_samp: { type: Number, required: true,
    },
       t_samp: { type: Number, required: true,
    },
    w_samp: { type: Number, required: true,
    },
    c_samp: { type: Number, required: true,
    },
    o_samp: { type: Number, required: true,
    },
    s_samp: { type: Number, required: true,
    },
        slg_samp: { type: Number, required: true,
    },

     admin: {  type: String, required: true
    },

 prod_id: { type: String, required: true,
    },
 outlet: {  type: String, required: true,
    },
     axis: { type: String,  required: true,
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
     created_at: {
        type: Date,default:Date.now()
       
    },

});

mongoose.model('supply_list', supplyList);