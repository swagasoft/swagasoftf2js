var mongoose = require('mongoose');
var moment = require('moment');


var merchant_pro =  mongoose.Schema({
 
    merchantName : {
        type: String,
        required: true
    },
    group :{type:String},
    mixed :  [{ store: String, bottles: Number, rate:Number}],

    created_at: {
        type: Date, 
    },
    day : {
        type: String,  
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
    m_rate :{
        type:Number
    }

});

mongoose.model('merchant_pro', merchant_pro);

// [{
//     _id: 3980923urjf0e232902343252,
//     wordcounts: [
//       {_id: 2039840297502938402934, word: "Apple", count:3}, 
//       {_id: 20398sdfsdfsdfaaa4asd3, word: "Banana", count:5}
//       ]
//     }]

// db.foo.update({"_id" :ObjectId("...") },{$set : {"Monday.z":8}})

// Query - 
//  var obj = {
//            name : "Hamburg",
//            number : "G002"
//           };
//  country.update({name: "France"},
//                 { $push :  { cities: obj}},
//                 function(err,result){})