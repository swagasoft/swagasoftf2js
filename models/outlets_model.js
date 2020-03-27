const mongoose = require('mongoose');

var outletSchema = mongoose.Schema({

    name: { type: String,required: true }, code: { type: String, required: true,  unique : true},
       p_price: { type: Number, required: true,
    }, 
    o_price: { type: Number, required: true,
    },
     w_price: {  type: Number,  required: true,
    },
     t_price: { type: Number,  required: true,
    },
     c_price: { type: Number, required: true,
    },
    s_price: { type: Number, required: true,
    },
    slg_price: { type: Number, required: true,
    },
    
    p_max: {  type: Number,  required: true,
    },
     o_max: { type: Number,  required: true,
    },
     w_max: { type: Number, required: true,
    },
     t_max: { type: Number, required: true,
    },
     c_max: { type: Number, required: true,
    },
     s_max: { type: Number, required: true,
    },
    slg_max: {  type: Number, required: true,
    },
    
    merchant_rate: {  type: Number, required: true,
    },

    edit: { type: Number, default:0
    },

    axis: { type: String, required: true,
    },
     location: { type: String, required: true,
    }, 

    accom_p :{ type: Number,default:0
    },
    accom_o :{type: Number, default:0
    },
    accom_w :{type: Number, default:0
    },
    accom_t :{ type: Number, default:0
    },
    accom_c :{ type: Number, default:0
    },
    accom_s :{ type: Number, default:0
    },
    accom_slg :{ type: Number, default:0
    },

    accom_p_samp :{ type: Number,default:0
    },
    accom_o_samp :{type: Number, default:0
    },
    accom_w_samp :{type: Number, default:0
    },
    accom_t_samp :{ type: Number, default:0
    },
    accom_c_samp :{ type: Number, default:0
    },
    accom_s_samp :{ type: Number, default:0
    },
    accom_slg_samp :{ type: Number, default:0
    },

    p_return :{ type: Number,default:0
    },
    o_return :{type: Number, default:0
    },
    w_return :{type: Number, default:0
    },
    t_return :{ type: Number, default:0
    },
    c_return :{ type: Number, default:0
    },
    s_return :{ type: Number, default:0
    },
    slg_return :{ type: Number, default:0
    },
    created_at: { type: Date, default: Date.now()
    },
    admin: {type: String, required: true}
});

mongoose.model('Outlet', outletSchema);