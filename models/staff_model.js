const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var staffSchema = mongoose.Schema({
    fullname: { type: String, required: true, unique: true
    },
     phone: { type: String,
    },
      address: { type: String,
    },  
  
    bankAccountName: { type: String, required: true
    },
     bankNumber: { type: String, required: true,  unique: true
    },
     bankName: { type: String,  
    },
     bankAccountType: { type: String, required: true,
    },
     salary: { type: Number, default: 0
    }, 
    department: { type: String, required: true
    },
     created_at: {type: Date, default : Date.now()
    },
      penalty: { type: Number, default: 0
    },
    savings: { type: Number, default: 0
    },
    give: { type: Number, default: 0
    },
    penalize: { type: Boolean, default: false
    },
    advance_salary: { type: Number,  default: 0
    },
    edited: { type: Number, default: 0
    },
    admin: { type: String
    },
    settled :{type: Boolean , default: false
    },
    not_paid :{type: Boolean , default: false
    },
    bonus: { type: Number, default: 0
    },
     AmountPaid: { type: Number, default: 0
    },

});
staffSchema.plugin(uniqueValidator);

mongoose.model('staff', staffSchema);