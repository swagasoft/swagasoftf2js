const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const lodash = require("lodash");
const OutletModel = mongoose.model('Outlet');


const createOutlet = async(req, res)=> {
    var newModel = new OutletModel();
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
        newModel.axis = req.body.axis;
        newModel.location = req.body.location;
        newModel.save((err, docs)=> {
            if(!err){
                res.status(200).send({msg: "registration successful..."});
              }else{
                  if(err.code === 11000){
                    res.status(422).send({msg : "outlet given 'CODE' already exist"});
                  }else{
                    res.status(422).send({msg : 'error in form values'});
                  }
              }
        });
}

const getAll = async (req, res)=> {
    OutletModel.find({},(err, docs)=> {
        res.status(200).send(docs);
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
    OutletModel.findById({_id: req.params.id}).then((outlet)=> {
      res.status(200).send({outlet: outlet});
    });
   
  }

  const searcOutlet = async(req, res)=> {
    console.log('file',req.body);
    const name = req.body.search;
   await OutletModel.find({"name": {$regex: name, $options:"i"}}, (err, document)=> {
      res.status(200).send({docs: document})
    });
  }

  const editOutlet = async(req, res)=> {
      console.log(req.params.id);
      const fileID = req.params.id;
      OutletModel.findById({_id: fileID},(err, doc)=> {
          res.status(200).send({doc : doc });
      });
  }




module.exports = { createOutlet, getAll, deleteOutlet ,editOutlet, searcOutlet,
            findOutletbyId }