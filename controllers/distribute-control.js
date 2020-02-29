

const mongoose = require('mongoose');
const lodash = require("lodash");
const prodModel = mongoose.model('production');
const SupplyModel = mongoose.model('supply_list');


const submitProd = async (req, res)=> {
    await prodModel.findOne({close:true}).sort({created_at:1}).then((record)=> {
        if(record){
            var newProd = new prodModel();
            newProd.open_p = record.bal_p;
            newProd.open_o = record.bal_o;
            newProd.open_w = record.bal_w;
            newProd.open_t = record.bal_t;
            newProd.open_c = record.bal_c;
            newProd.open_s = record.bal_s;
            newProd.open_slg = record.bal_slg;

            newProd.prod_p = req.body.pineapple;
            newProd.prod_o = req.body.orange;
            newProd.prod_w = req.body.watermelon;
            newProd.prod_t = req.body.tigernut;
            newProd.prod_c = req.body.carrot;
            newProd.prod_s = req.body.sugarcane;
            newProd.prod_slg = req.body.slg;
            newProd.save().then(()=> {
                res.status(200).send({msg : 'submitted successful!'});
            }).catch((err)=> {
                console.log(err);
                res.status(422).send({msg : ' error creating production!'});
            });
        }else{
            var newProd = new prodModel();
            newProd.prod_p = req.body.pineapple;
            newProd.prod_o = req.body.orange;
            newProd.prod_w = req.body.watermelon;
            newProd.prod_t = req.body.tigernut;
            newProd.prod_c = req.body.carrot;
            newProd.prod_s = req.body.sugarcane;
            newProd.prod_slg = req.body.slg;
            newProd.save().then(()=> {
                res.status(200).send({msg : 'submitted successful!'});
            }).catch((err)=> {
                console.log(err);
                res.status(422).send({msg : ' error creating production!'});
            });
        }
        
   
        });
        }


const getProduction = async (req, res)=> {
       await prodModel.findOne({close : false}).sort({created_at:1}).then((documents)=> {
           if(documents){
               SupplyModel.find({prod_id:documents._id}).then((list)=> {
                   if(list){
                    res.status(200).send({docs: documents, supplies:list});
                   }else{
                    res.status(200).send({docs: documents, supplies:null});
                   }
               });
           
           }else{
            res.status(404).send({msg:'no production record!'});
           }
        });
        }

const sumbitBadStock = async (req, res)=> {
    await prodModel.findById({_id:req.body.id}).then((doc)=> {
        doc.bad_p += req.body.bad_p;
        doc.bad_o += req.body.bad_o;
        doc.bad_w += req.body.bad_w;
        doc.bad_t += req.body.bad_t;
        doc.bad_c += req.body.bad_c;
        doc.bad_s += req.body.bad_s;
        doc.bad_slg += req.body.bad_slg;
        doc.save().then(()=> {
            res.status(200).send({msg:'submitted successfully'});
        }).catch((err)=> {
            console.log(err);
            res.status(422).send({msg:'something went wrong'});
        });
    });
   
}


const supplyOutlet = async (req, res)=> {
    console.log('submitting to outlet..');
    var newSupply = new SupplyModel();
    newSupply.orange = req.body.orange;
    newSupply.watermelon = req.body.watermelon;
    newSupply.tigernut = req.body.tigernut;
    newSupply.pineapple = req.body.pineapple;
    newSupply.carrot = req.body.carrot;
    newSupply.sugarcane = req.body.sugarcane;
    newSupply.slg = req.body.slg;
    newSupply.admin = req.body.admin;
    newSupply.outlet = req.body.outlet;
    newSupply.axis = req.body.axis;
    newSupply.prod_id = req.body.fileId;
    newSupply.save().then(()=> {
        prodModel.findById({_id:req.body.fileId}).then((doc)=> {
            doc.prod_p = doc.prod_p - req.body.pineapple;
            doc.prod_o = doc.prod_o - req.body.orange;
            doc.prod_w = doc.prod_w - req.body.watermelon;
            doc.prod_t = doc.prod_t - req.body.tigernut;
            doc.prod_c = doc.prod_c - req.body.carrot;
            doc.prod_s = doc.prod_s - req.body.sugarcane;
            doc.prod_slg = doc.prod_slg - req.body.slg;
            
            doc.sup_p += req.body.pineapple;
            doc.sup_o += req.body.orange;
            doc.sup_w +=  req.body.watermelon;
            doc.sup_t += req.body.tigernut;
            doc.sup_c +=  req.body.carrot;
            doc.sup_s +=  req.body.sugarcane;
            doc.sup_slg += req.body.slg;
            doc.save().then(()=> {
                res.status(200).send({msg:'record submitted successful'});
            }).catch((err)=>{
                console.warn(err);
                res.status(422).send({msg:'something went wrong'});
            });
        })
    }).catch((err)=> {
        console.warn(err);
        res.status(412).send({msg:'something went wrong'});
    });
      
  }

     const  closeRecord = async (req, res)=> {
            console.log(req.params.id);
          await prodModel.findById({_id:req.params.id}).then((doc)=> {
              console.log(doc);
                doc.close = true;
                doc.bal_p = doc.prod_p - doc.bad_p - doc.sup_p;
                doc.bal_o = doc.prod_o - doc.bad_o - doc.sup_o;
                doc.bal_w = doc.prod_w - doc.bad_w - doc.sup_w;
                doc.bal_t = doc.prod_t - doc.bad_t - doc.sup_t;
                doc.bal_c = doc.prod_c - doc.bad_c - doc.sup_c;
                doc.bal_s = doc.prod_s - doc.bad_s - doc.sup_s;
                doc.bal_slg = doc.prod_slg - doc.bad_slg - doc.sup_slg;
                doc.save().then(()=> {
                    res.status(200).send({msg:'submitted'})
                })
            });

           
        }
module.exports = {submitProd, getProduction, sumbitBadStock, supplyOutlet, closeRecord}