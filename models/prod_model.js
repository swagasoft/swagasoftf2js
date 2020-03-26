const mongoose = require('mongoose');
var moment = require('moment');

var prodSchema = mongoose.Schema({
    who_create: {  type: String, required: true
    },
    who_close: {  type: String,
    },
    who_bad_stock: {  type: String,
    },
     prod_p: {  type: Number, required: true,
    },
     prod_o: { type: Number, required: true
    },
      prod_w: { type: Number, required: true
    },  
    prod_t: {type: Number, required: true
    },
     prod_c: { type: Number, required: true, 
    },
     prod_s: {  type: Number,  required: true,
    },
     prod_slg: {  type: Number, required: true,
    }, 

    open_p: { type:Number , default : 0
    },
    open_o: { type: Number, default : 0
    },
    open_w: { type: Number, default : 0
    },
    open_t: { type: Number, default : 0
    },
    open_c: { type: Number, default : 0
    },
    open_s: { type: Number, default : 0
    },
    open_slg: { type: Number, default : 0
    },

    bad_p: { type: Number, default : 0
    },
    bad_o: { type: Number, default : 0
    },
    bad_w: { type: Number, default : 0
    },
    bad_t: { type: Number, default : 0
    },
    bad_c: { type: Number, default : 0
    },
    bad_s: { type: Number, default : 0
    },
    bad_slg: { type: Number, default : 0
    },

    sup_p: { type: Number, default : 0
    },
    sup_o: { type: Number, default : 0
    },
    sup_w: { type: Number, default : 0
    },
    sup_t: { type: Number, default : 0
    },
    sup_c: { type: Number, default : 0
    },
    sup_s: { type: Number, default : 0
    },
    sup_slg: { type: Number, default : 0
    },

    bal_p: { type: Number, default : 0
    },
    bal_o: { type: Number, default : 0
    },
    bal_w: { type: Number, default : 0
    },
    bal_t: { type: Number, default : 0
    },
    bal_c: { type: Number, default : 0
    },
    bal_s: { type: Number, default : 0
    },
    bal_slg: { type: Number, default : 0
    },
    close :{ type: Boolean, default: false
    },
    confirm :{ type: Boolean, default: false
    },
    edit :{ type: String, default: 0
    },
    products : {
        type: Array, default:['pineapple', 'orange', 'watermelon','tigernut','carrot','sugarcane','slg']
    },
     created_at: {
        type: Date, required: true
    },
    
    qDay :{
        type:Number, required: true
    },
    qMonth :{
        type:Number, required: true
    },
    qYear :{
        type:Number,required: true
    },
    day : {
     type: String, required: true
  },

});

mongoose.model('production', prodSchema);