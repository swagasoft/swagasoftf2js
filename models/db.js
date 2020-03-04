const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DATABASE = 'mongodb+srv://swagasoft:simoopam222@cluster0-qr7x4.gcp.mongodb.net/farm2juice?retryWrites=true&w=majority';
// const DATABASE = 'mongodb://localhost:27017/farm2juice';
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
require('./prod_model');
require('./supply_model');
require('./salary_adv_model');
require('./penalty_model');

