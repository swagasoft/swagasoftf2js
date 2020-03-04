const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var staffSchema = mongoose.Schema({
    fullname: { type: String, required: true,
    },
     phone: { type: String,
    },
      address: { type: String,
    },  
  
    bankAccountName: { type: String, required: true
    },
     bankNumber: { type: String, required: true,  unique: true
    },
     bankAccountType: { type: String, required: true,
    },
     salary: { type: Number, default: 0
    }, 
    department: { type: String, required: true
    },
     created_at: {type: Date, default : Date.now()
    },
    sacked: { type: Boolean, default: false
    },
      penalty: { type: Number, default: 0
    },
     offence: { type: String,  default: 'null'
    },
     offence_info: { type: String, default: 'null'
    },
    
    savings: { type: Number, default: 0
    },
    advance_salary: { type: Number,  default: 0
    },
    edited: { type: Number, default: 0
    },
    admin: { type: String, required: true
    },
    bonus: { type: Number, default: 0
    },
     AmountPaid: { type: Number, default: 0
    },

});
staffSchema.plugin(uniqueValidator);

mongoose.model('staff', staffSchema);