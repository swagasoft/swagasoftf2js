const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DATABASE = 'mongodb://localhost:27017/farm2juice';
mongoose.connect(DATABASE,{useNewUrlParser : true, useUnifiedTopology: true},(err) => {
    if(!err) console.log(DATABASE,'mongodb connection successful..');
    else
    console.log("error in connection"+ JSON.stringify(err, undefined, 2));
});  
   
require('./users_model'); 
require('./outlets_model');
require('./expense_account');
require('./expense_list');
require('./expense_credit');
require('./staff_model');

