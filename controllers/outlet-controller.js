const mongoose = require('mongoose');
const staffModel = mongoose.model('staff');
const OutletModel = mongoose.model('Outlet');


const createOutlet = async(req, res)=> {
    var newModel = new OutletModel();
    console.log(req.body)
        newModel.name = req.body.name;
        const codeToUpper = req.body.code.toUpperCase();
        newModel.code =  codeToUpper;
        newModel.p_price = req.body.p_price;
        newModel.o_price = req.body.o_price;
        newModel.w_price = req.body.w_price;
        newModel.t_price = req.body.t_price;
        newModel.c_price = req.body.c_price;
        newModel.s_price = req.body.s_price;
        newModel.slg_price = req.body.slg_price;
        newModel.p_max = req.body.p_max;
        newModel.o_max = req.body.o_max;
        newModel.w_max = req.body.w_max;
        newModel.t_max = req.body.t_max;
        newModel.c_max = req.body.c_max;
        newModel.s_max = req.body.s_max;
        newModel.slg_max = req.body.slg_max;
        newModel.location = req.body.location;
        newModel.merchant_rate = req.body.merchant_rate;
     
        newModel.admin = req.body.admin; 
        newModel.save((err, docs)=> {
            if(!err){
                res.status(200).send({msg: "registration successful..."});
              }else{
                  if(err.code === 11000){
                    res.status(422).send({msg : "outlet given 'CODE' already exist"});
                  }else{
                    console.log(err);
                    res.status(422).send({msg : 'error in form values'});
                  }
              }
        });
}



const editOutlet = async(req, res)=> {
  console.log('eddittt',req.body);
  OutletModel.findById({_id: req.body.id},(err, outlet)=> {
    if(outlet.admin != req.body.admin){
      res.status(401).send({msg:'AUTHORIZATION ERROR!'})
    }else{

      const codeToUpper = req.body.code.toUpperCase();
      outlet.code =  codeToUpper;
      outlet.edit += 0;
      outlet.p_price = req.body.p_price;
      outlet.o_price = req.body.o_price;
      outlet.w_price = req.body.w_price;
      outlet.t_price = req.body.t_price;
      outlet.c_price = req.body.c_price;
      outlet.s_price = req.body.s_price;
      outlet.slg_price = req.body.slg_price;
      outlet.p_max = req.body.p_max;
      outlet.o_max = req.body.o_max;
      outlet.w_max = req.body.w_max;
      outlet.t_max = req.body.t_max;
      outlet.c_max = req.body.c_max;
      outlet.s_max = req.body.s_max;
      outlet.slg_max = req.body.slg_max;
      outlet.location = req.body.location;
      outlet.save().then(()=>{
        res.status(200).send({msg:'success!'})
      })
    }
  }).catch((err)=> {
    console.log(err);
    res.status(403).send({msg:'error updating record'})
  }).catch((err)=> {
    console.log(err);
    res.status(402).send({msg:'cannot not process update!'});
  })
}


const getAll = async (req, res)=> {
    OutletModel.find({}).sort({created_at: -1}).then((docs)=> {
      
      res.status(200).send({outlets: docs});
    });
}

const deleteOutlet =  async (req, res)=> {
    const outlet_ID = req.params.id;
    console.log('delete user', outlet_ID );
    await OutletModel.findByIdAndDelete({_id: outlet_ID} ).then(()=> {
      res.status(200).send({msg:'outlet has been deleted'});
    });

    res.status(200).send({msg:'outlet has been deleted'});
  }

  const findOutletbyId = async (req, res) =>{
   var outlet = await OutletModel.findById({_id: req.params.id});
   console.log('SPECIFIELD OUTLET',outlet.location)
   staffModel.find({location: outlet.location}).then((merchantInLocation)=>{
     console.log('STAFF  IN LOCATION',merchantInLocation)
     res.status(200).send({outlet: outlet, merchant: merchantInLocation});
   })
     
   
   
  }

  const searcOutlet = async(req, res)=> {
    const name = req.body.search;
   await OutletModel.find({"code": {$regex: name, $options:"i"}}, (err, document)=> {
      res.status(200).send({docs: document})
    });
  }


  const getAllMerchant = async (req, res)=> {

    staffModel.find({department:'MERCHANDISER'}).then((merchant)=> {
      res.status(200).send({merchant: merchant});
    });
  }

  const updateMerchantRate = async (req, res)=> {
    console.log(req.body);
    const fileId = req.body.id;
    const amount = req.body.values.amount;
    console.log(fileId)
    console.log(amount)
    await OutletModel.findByIdAndUpdate({_id:fileId},{merchant_rate: amount});
    res.status(200).send({msg:' update successful!'})
  }




module.exports = { createOutlet, getAll, deleteOutlet ,editOutlet, searcOutlet,
            findOutletbyId , getAllMerchant, updateMerchantRate}