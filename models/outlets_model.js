const mongoose = require('mongoose');


var outletSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
     code: {
        type: String,
        required: true,
        unique : true
    },
       p_price: {
        type: Number,
        required: true,
    }, 
    o_price: {
        type: Number,
        required: true,
    },
     w_price: {
        type: Number,
        required: true,
    },
     t_price: {
        type: Number,
        required: true,
    },
     c_price: {
        type: Number,
        required: true,
    },
    s_price: {
        type: Number,
        required: true,
    },
    slg_price: {
        type: Number,
        required: true,
    },
    
    p_max: {
        type: Number,
        required: true,
    }, o_max: {
        type: Number,
        required: true,
    }, w_max: {
        type: Number,
        required: true,
    }, t_max: {
        type: Number,
        required: true,
    }, c_max: {
        type: Number,
        required: true,
    }, s_max: {
        type: Number,
        required: true,
    },
    slg_max: {
        type: Number,
        required: true,
    },
    
    axis: {
        type: String,
        required: true,
    },
     location: {
        type: String,
        required: true,
    }, 
    created_at: {
        type: Date,
        default: Date.now()
    },
});

mongoose.model('Outlet', outletSchema);