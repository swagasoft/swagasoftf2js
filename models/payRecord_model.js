const mongoose = require('mongoose');

var payRecordSchema = mongoose.Schema({
    fullname: { type: String, 
    }, 
    bankAccountName: { type: String,
    },
     bankNumber: { type: String, 
    },
     bankAccountType: { type: String, 
    },
     salary: { type: Number, 
    }, 
    department: { type: String, 
    },
     created_at: {type: Date, default: Date.now()
    },
      penalty: { type: Number, 
    },
    savings: { type: Number, 
    },
    give: { type: Number, 
    },
    advance_salary: { type: Number, 
    },
    settled :{type: Boolean ,
    },
    not_paid :{type: Boolean , 
    },
    bonus: { type: Number,
    },
     AmountPaid: { type: Number, 
    }, 
    qDay : { type:Number, default: new Date().getDate(Date.now) } ,
    qMonth : { type:Number,default: new Date().getMonth(Date.now) + 1 } ,
    qYear : { type:Number,default: new Date().getFullYear(Date.now)} ,


});

mongoose.model('pay_record', payRecordSchema);

