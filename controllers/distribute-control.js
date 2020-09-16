

const mongoose = require('mongoose');
const lodash = require("lodash");
const moment = require('moment');
const prodModel = mongoose.model('production');
const SupplyModel = mongoose.model('supply_list');
const UserModel = mongoose.model('User');


const submitProd = async (req, res)=> {
    await prodModel.findOne({close : false}).sort({created_at:-1}).then((record)=> {
        if(record){
            res.status(422).send({msg:'open record already exit'});
        }else{
     prodModel.findOne({close:true}).sort({created_at:-1}).then((record)=> {
         console.log('record',record);
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
            
            // balance
            newProd.bal_p = record.bal_p + req.body.pineapple ;
            newProd.bal_o = record.bal_o + req.body.orange ;
            newProd.bal_w = record.bal_w + req.body.watermelon ;
            newProd.bal_t = record.bal_t + req.body.tigernut ;
            newProd.bal_c = record.bal_c + req.body.carrot ;
            newProd.bal_s = record.bal_s + req.body.sugarcane ;
            newProd.bal_slg = record.bal_slg + req.body.slg ;
            newProd.who_create = req.body.admin;
            newProd.created_at = req.body.date;
            newProd.qDay = new Date().getDate(req.body.date);
            newProd.qMonth = new Date().getMonth(req.body.date) + 1;
            newProd.qYear = new Date().getFullYear(req.body.date) ;
            newProd.day = moment(req.body.date).format('l') ;
            newProd.save().then(()=> {
                res.status(200).send({msg : 'submitted successful!'});
            }).catch((err)=> {
                console.log('ERROR SAVING..',err);
                res.status(422).send({msg : ' error creating production!'});
            });
        }else{
            console.log('new prod 2');
            var newProd = new prodModel();
            newProd.prod_p = req.body.pineapple;
            newProd.prod_o = req.body.orange;
            newProd.prod_w = req.body.watermelon;
            newProd.prod_t = req.body.tigernut;
            newProd.prod_c = req.body.carrot;
            newProd.prod_s = req.body.sugarcane;
            newProd.prod_slg = req.body.slg;
            newProd.created_at = req.body.date;
            // balance
            newProd.bal_p =  req.body.pineapple ;
            newProd.bal_o =  req.body.orange ;
            newProd.bal_w =  req.body.watermelon ;
            newProd.bal_t =  req.body.tigernut ;
            newProd.bal_c =  req.body.carrot ;
            newProd.bal_s =  req.body.sugarcane ;
            newProd.bal_slg =  req.body.slg ;
            newProd.who_create = req.body.admin;

            newProd.qDay = new Date().getDate(req.body.date);
            newProd.qMonth = new Date().getMonth(req.body.date) + 1;
            newProd.qYear = new Date().getFullYear(req.body.date) ;
            newProd.day = moment(req.body.date).format('l') ;
            newProd.save().then(()=> {
                res.status(200).send({msg : 'submitted successful!'});
            }).catch((err)=> {
                console.log('ERROR SAVING',err);
                res.status(422).send({msg : ' error creating production!'});
            });
        }
        
   
        });
        // end create
            }
        });
        }


const getProduction = async (req, res)=> {
       await prodModel.findOne({close : false}).sort({created_at:1}).then((documents)=> {
           if(documents){
               SupplyModel.find({prod_id:documents._id}).sort({created_at:-1}).then((list)=> {
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
    console.log(req.body)
    await prodModel.findById({_id:req.body.id}).then((doc)=> {
        if(!doc){
            res.status(404).send({msg:'PRODUCTION NOT FOUND!'});
        }else{
         
        doc.who_bad_stock = req.body.admin;
        doc.bad_p += req.body.bad_p;
        doc.bad_o += req.body.bad_o;
        doc.bad_w += req.body.bad_w;
        doc.bad_t += req.body.bad_t;
        doc.bad_c += req.body.bad_c;
        doc.bad_s += req.body.bad_s;
        doc.bad_slg += req.body.bad_slg;
        // update balance stock
        doc.bal_p -= req.body.bad_p;
        doc.bal_o -= req.body.bad_o;
        doc.bal_w -= req.body.bad_w;
        doc.bal_t -= req.body.bad_t;
        doc.bal_c -= req.body.bad_c;
        doc.bal_s -= req.body.bad_s;
        doc.bal_slg -= req.body.bad_slg;
        doc.save().then(()=> {
            res.status(200).send({msg:'submitted successfully'});
        }).catch((err)=> {
            console.log(err);
            res.status(422).send({msg:'something went wrong'});
        });
    
    }
        //
    })
}

const confirmSupply = async(req, res)=> {
    await SupplyModel.updateOne({_id:req.params.id},{confirm:true});
    res.status(200).send({msg:'confirmed!'});
}
const unConfirmSupply = async(req, res)=> {
    await SupplyModel.updateOne({_id:req.params.id},{confirm:false});
    res.status(200).send({msg:'un-confirmed!'});
}
const verifySupply = async(req, res)=> {
    await SupplyModel.updateOne({_id:req.params.id},{verify:true});
    res.status(200).send({msg:'verified!'});
}
const unVerifySupply = async(req, res)=> {
    await SupplyModel.updateOne({_id:req.params.id},{verify:false});
    res.status(200).send({msg:'un-verified!'});
}


const updateSupply = async (req, res)=> {
    console.log(req.body);
  await  SupplyModel.findById({_id:req.body.id}).then((supply)=> {
        if(supply.verify || supply.confirm){
            res.status(412).send({msg:'EDIT ACCESS DENIED!'})
        }else{

        
      prodModel.findById({_id:req.body.prod_id}).then((prod)=> {
        //   deduct product supplied from supply
        prod.sup_p -= supply.pineapple + supply.p_samp + supply.p_exg;
        prod.sup_o -= supply.orange + supply.o_samp + supply.o_exg;
        prod.sup_w -=  supply.watermelon + supply.w_samp + supply.w_exg;
        prod.sup_t -= supply.tigernut + supply.t_samp + supply.t_exg;
        prod.sup_c -=  supply.carrot +supply.c_samp + supply.c_exg;
        prod.sup_s -=  supply.sugarcane + supply.s_samp + supply.s_exg;
        prod.sup_slg -= supply.slg + supply.slg_samp + supply.slg_exg;
        // add return to balance
        prod.bal_p -= supply.p_return;
        prod.bal_o -= supply.o_return;
        prod.bal_w -= supply.w_return;
        prod.bal_t -= supply.t_return;
        prod.bal_c -= supply.c_return;
        prod.bal_s -= supply.s_return;
        prod.bal_slg -= supply.slg_return;
          // add return to balance body
          prod.bal_p += req.body.p_return;
          prod.bal_o += req.body.o_return;
          prod.bal_w += req.body.w_return;
          prod.bal_t += req.body.t_return;
          prod.bal_c += req.body.c_return;
          prod.bal_s += req.body.s_return;
          prod.bal_slg += req.body.slg_return;
        // update bal
        prod.bal_p += supply.pineapple + supply.p_samp + supply.p_exg;
        prod.bal_o += supply.orange + supply.o_samp + supply.o_exg;
        prod.bal_w +=  supply.watermelon + supply.w_samp + supply.w_exg;
        prod.bal_t += supply.tigernut + supply.t_samp + supply.t_exg;
        prod.bal_c +=  supply.carrot +supply.c_samp + supply.c_exg;
        prod.bal_s +=  supply.sugarcane + supply.s_samp + supply.s_exg;
        prod.bal_slg += supply.slg + supply.slg_samp + supply.slg_exg;
        // add to supply
        prod.sup_p += req.body.pineapple + req.body.p_samp + req.body.p_exg;
        prod.sup_o += req.body.orange + req.body.o_samp + req.body.o_exg;
        prod.sup_w +=  req.body.watermelon + req.body.w_samp + req.body.w_exg;
        prod.sup_t += req.body.tigernut + req.body.t_samp + req.body.t_exg;
        prod.sup_c +=  req.body.carrot +req.body.c_samp + req.body.c_exg;
        prod.sup_s +=  req.body.sugarcane + req.body.s_samp + req.body.s_exg;
        prod.sup_slg += req.body.slg + req.body.slg_samp + req.body.slg_exg;
        // deduct from balance
        prod.bal_p -=  req.body.pineapple + req.body.p_samp + req.body.p_exg ;
        prod.bal_o -=  req.body.orange + req.body.o_samp + req.body.o_exg ;
        prod.bal_w -= req.body.watermelon + req.body.w_samp + req.body.w_exg ;
        prod.bal_t  -= req.body.tigernut + req.body.t_samp +req.body.t_exg ;
        prod.bal_c -= req.body.carrot +req.body.c_samp+ req.body.c_exg ;
        prod.bal_s -= req.body.sugarcane + req.body.s_samp+ req.body.s_exg ;
        prod.bal_slg -= req.body.slg + req.body.slg_samp + req.body.slg_exg ;
        prod.save().then(()=> {

             
       //  supply
       supply.orange = req.body.orange - req.body.o_return;
       supply.watermelon = req.body.watermelon - req.body.w_return;
       supply.tigernut = req.body.tigernut - req.body.t_return;
       supply.pineapple = req.body.pineapple  - req.body.p_return;
       supply.carrot = req.body.carrot  - req.body.c_return;
       supply.sugarcane = req.body.sugarcane - req.body.s_return;
       supply.slg = req.body.slg - req.body.slg_return;
         //  sample
         supply.o_samp = req.body.o_samp;
         supply.w_samp = req.body.w_samp ;
         supply.t_samp = req.body.t_samp ;
         supply.p_samp = req.body.p_samp ;
         supply.c_samp = req.body.c_samp;
         supply.s_samp = req.body.s_samp ;
         supply.slg_samp = req.body.slg_samp ;

           // exchange
           supply.p_exg = req.body.p_exg ;
           supply.o_exg = req.body.o_exg ;
           supply.w_exg = req.body.w_exg ;
           supply.t_exg = req.body.t_exg ;
           supply.c_exg = req.body.c_exg ;
           supply.s_exg = req.body.s_exg ;
           supply.slg_exg = req.body.slg_exg ;
     // return
     supply.p_return = req.body.p_return ;
     supply.o_return = req.body.o_return ;
     supply.w_return = req.body.w_return ;
     supply.t_return = req.body.t_return ;
     supply.c_return = req.body.c_return ;
     supply.s_return = req.body.s_return ;
     supply.slg_return = req.body.slg_return ;

     supply.admin = req.body.admin;
     supply.outlet = req.body.outlet;
     supply.location = req.body.location;
     supply.edit += 1;
     supply.save().then(()=> {
         res.status(200).send({msg:'update successful...!'});
     })
  }).catch((err)=> {
      res.status(422).send({msg:'error updating record'});
  })
        })
      } }  //close
       )

   
}

const supplyOutlet = async (req, res)=> { 
    console.log(req.body);
    await prodModel.findById({_id:req.body.fileId}).then((production)=> {
        if(!production){
            res.status(422).send({msg:'PRODUCTION HAS CLOSE!'});
        }else{
        production.bal_p += req.body.p_return;
        production.bal_o += req.body.o_return;
        production.bal_w += req.body.w_return;
        production.bal_t += req.body.t_return;
        production.bal_c += req.body.c_return;
        production.bal_s += req.body.s_return;
        production.bal_slg += req.body.slg_return;
        production.save().then((prod)=> {
    var newSupply = new SupplyModel();
    // rate
    newSupply.rate_p = req.body.rate_p;
    newSupply.rate_o = req.body.rate_o;
    newSupply.rate_w = req.body.rate_w;
    newSupply.rate_t = req.body.rate_t;
    newSupply.rate_c = req.body.rate_c;
    newSupply.rate_s = req.body.rate_s;
    newSupply.rate_slg = req.body.rate_slg;
    //  supply
    newSupply.orange = req.body.orange - req.body.o_return;
    newSupply.watermelon = req.body.watermelon - req.body.w_return;
    newSupply.tigernut = req.body.tigernut - req.body.t_return;
    newSupply.pineapple = req.body.pineapple  - req.body.p_return;
    newSupply.carrot = req.body.carrot  - req.body.c_return;
    newSupply.sugarcane = req.body.sugarcane - req.body.s_return;
    newSupply.slg = req.body.slg - req.body.slg_return;
    //  sample
    newSupply.o_samp = req.body.o_samp;
    newSupply.w_samp = req.body.w_samp ;
    newSupply.t_samp = req.body.t_samp ;
    newSupply.p_samp = req.body.p_samp ;
    newSupply.c_samp = req.body.c_samp;
    newSupply.s_samp = req.body.s_samp ;
    newSupply.slg_samp = req.body.slg_samp ;
    // exchange
    newSupply.p_exg = req.body.p_exg ;
    newSupply.o_exg = req.body.o_exg ;
    newSupply.w_exg = req.body.w_exg ;
    newSupply.t_exg = req.body.t_exg ;
    newSupply.c_exg = req.body.c_exg ;
    newSupply.s_exg = req.body.s_exg ;
    newSupply.slg_exg = req.body.slg_exg ;
     // return
    newSupply.p_return = req.body.p_return ;
    newSupply.o_return = req.body.o_return ;
    newSupply.w_return = req.body.w_return ;
    newSupply.t_return = req.body.t_return ;
    newSupply.c_return = req.body.c_return ;
    newSupply.s_return = req.body.s_return ;
    newSupply.slg_return = req.body.slg_return ;

    newSupply.admin = req.body.admin;
    newSupply.outlet = req.body.outlet;
    newSupply.location = req.body.location;
    newSupply.prod_id = req.body.fileId;
    newSupply.created_at = req.body.date;
    newSupply.qDay = new Date().getDate(req.body.date);
    newSupply.qMonth = new Date().getMonth(req.body.date) + 1;
    newSupply.qYear = new Date().getFullYear(req.body.date) ;
    newSupply.day = moment(req.body.date).format('l') ;
    newSupply.save().then(()=> {
        prodModel.findById({_id:req.body.fileId}).then((doc)=> {
            // update supply
            doc.sup_p += req.body.pineapple + req.body.p_samp + req.body.p_exg;
            doc.sup_o += req.body.orange + req.body.o_samp + req.body.o_exg;
            doc.sup_w +=  req.body.watermelon + req.body.w_samp + req.body.w_exg;
            doc.sup_t += req.body.tigernut + req.body.t_samp + req.body.t_exg;
            doc.sup_c +=  req.body.carrot +req.body.c_samp + req.body.c_exg;
            doc.sup_s +=  req.body.sugarcane + req.body.s_samp + req.body.s_exg;
            doc.sup_slg += req.body.slg + req.body.slg_samp + req.body.slg_exg;

            doc.bal_p -=  req.body.pineapple + req.body.p_samp + req.body.p_exg ;
            doc.bal_o -=  req.body.orange + req.body.o_samp + req.body.o_exg ;
            doc.bal_w -= req.body.watermelon + req.body.w_samp + req.body.w_exg ;
            doc.bal_t  -= req.body.tigernut + req.body.t_samp +req.body.t_exg ;
            doc.bal_c -= req.body.carrot +req.body.c_samp+ req.body.c_exg ;
            doc.bal_s -= req.body.sugarcane + req.body.s_samp+ req.body.s_exg ;
            doc.bal_slg -= req.body.slg + req.body.slg_samp + req.body.slg_exg ;
         
            doc.save().then((doc)=> {
                res.status(200).send({msg:'record submitted successful'});
            }).catch((err)=>{
                console.warn(err);
                res.status(422).send({msg:'error!, some value were not provided'});
            });
        })
    }).catch((err)=> {
        console.warn(err);
        res.status(412).send({msg:'error!, some value were provided'});
    });
})
    } // end if statement
}).catch((err)=> {
    console.log(err);
    res.status(422).send({msg:'PRODUCTION NOT AVAILABLE!'});
})
      
  }

     const  closeRecord = async (req, res)=> {
         let findUser = await UserModel.findById({_id:req._id});
         console.log('close the record...');
          await prodModel.findById({_id:req.params.id}).then((doc)=> {
             
               if(doc){
                   doc.who_close = findUser.username;
                doc.close = true;
                doc.save().then(()=> {
                    res.status(200).send({msg:'SUCCESS!'})
                })
               }else{
                   res.status(422).send({msg:'error clossing record.'});
               }
            }).catch((err)=> {
                console.log(err);
                res.status(412).send({msg:'error! no open production to close!'});
            })
        }

    const submitReturns = async(req, res)=> {
        let pineapple = req.body.pineapple;
        let orange = req.body.orange;
        let watermelon = req.body.watermelon;
        let tigernut = req.body.tigernut;
        let carrot = req.body.carrot;
        let sugarcane = req.body.sugarcane;
        let slg = req.body.slg;

        await  prodModel.findById({_id:req.body.fileId}).then((prod)=>{
            prod.bal_p += pineapple;
            prod.bal_o += orange;
            prod.bal_w += watermelon;
            prod.bal_t += tigernut;
            prod.bal_c += carrot;
            prod.bal_s += sugarcane;
            prod.bal_slg += slg;
            prod.save().then(()=> {

            })
        
      });

        var newReturn = new SupplyModel();
        newReturn.return =  true;
        // setting supply value as return
        newReturn.pineapple = -req.body.pineapple;
        newReturn.orange = -req.body.orange;
        newReturn.watermelon = -req.body.watermelon;
        newReturn.tigernut = -req.body.tigernut;
        newReturn.carrot = -req.body.carrot;
        newReturn.sugarcane = -req.body.sugarcane;
        newReturn.slg = -req.body.slg;
        // saving return as exact return.
        newReturn.p_return = req.body.pineapple;
        newReturn.o_return = req.body.orange;
        newReturn.w_return = req.body.watermelon;
        newReturn.t_return = req.body.tigernut;
        newReturn.c_return = req.body.carrot;
        newReturn.s_return = req.body.sugarcane;
        newReturn.slg_return = req.body.slg;
        newReturn.outlet = req.body.outlet;
        newReturn.location = req.body.location;
        newReturn.admin = req.body.admin;
        newReturn.prod_id = req.body.fileId;
        newReturn.created_at = req.body.date;
        newReturn.qDay = new Date().getDate(req.body.date);
        newReturn.qMonth = new Date().getMonth(req.body.date) + 1;
        newReturn.qYear = new Date().getFullYear(req.body.date) ;
        newReturn.day = moment(req.body.date).format('l') ;
        newReturn.save().then(()=> {
            res.status(200).send({msg:'success'});
        })
    }

    const editBadStock = async (req, res)=> {
        prodModel.findById({_id:req.body.id}).then((production)=> {
            if(production.confirm){
                res.status(412).send({msg:'EDIT IS LOCKED'});
            }else{
            production.bal_p += production.bad_p;
            production.bal_o += production.bad_o;
            production.bal_w += production.bad_w;
            production.bal_t += production.bad_t;
            production.bal_c += production.bad_c;
            production.bal_s += production.bad_s;
            production.bal_slg += production.bad_slg;
            production.save().then((prod)=> {
                prod.bad_p = req.body.bad_p;
                prod.bad_o = req.body.bad_o;
                prod.bad_w = req.body.bad_w;
                prod.bad_t = req.body.bad_t;
                prod.bad_c = req.body.bad_c;
                prod.bad_s = req.body.bad_s;
                prod.bad_slg = req.body.bad_slg;
                
                // deduct from balance
                prod.bal_p -= req.body.bad_p;
                prod.bal_o -= req.body.bad_o;
                prod.bal_w -= req.body.bad_w;
                prod.bal_t -= req.body.bad_t;
                prod.bal_c -= req.body.bad_c;
                prod.bal_s -= req.body.bad_s;
                prod.bal_slg -= req.body.bad_slg;
                prod.save().then(()=> {
                    res.status(200).send({msg:' update was successful!'});
                })
            })
            //
        }
        })
    }

    const editProduction = async (req, res)=> {
    await  prodModel.findById({_id:req.body.id}).then((production)=> {
        if(production.confirm){
            res.status(422).send({msg:'PRODUCTION LIS LOCKED!'});
        }else{
        
            production.bal_p -= production.prod_p;
            production.bal_o -= production.prod_o;
            production.bal_w -= production.prod_w;
            production.bal_t -= production.prod_t;
            production.bal_c -= production.prod_c;
            production.bal_s -= production.prod_s;
            production.bal_slg -= production.prod_slg;
            production.save().then((prod)=>{
                prod.prod_p = req.body.pineapple;
                prod.prod_o = req.body.orange;
                prod.prod_w = req.body.watermelon;
                prod.prod_t = req.body.tigernut;
                prod.prod_c = req.body.carrot;
                prod.prod_s = req.body.sugarcane;
                prod.prod_slg = req.body.slg;
                
                // balance
                prod.bal_p += req.body.pineapple;
                prod.bal_o += req.body.orange;
                prod.bal_w += req.body.watermelon;
                prod.bal_t += req.body.tigernut;
                prod.bal_c += req.body.carrot;
                prod.bal_s += req.body.sugarcane;
                prod.bal_slg += req.body.slg;
                prod.save().then(()=> {
                    res.status(200).send({msg:' update was successful!'});
                })
            })   
        }
        })
       
    }

    const UnConfirmProd = async (req, res)=> {
        await prodModel.updateOne({_id:req.params.id},{confirm:false});
        res.status(200).send({msg:'success!'});
    }
    const confirmProd = async (req, res)=> {
        await prodModel.updateOne({_id:req.params.id},{confirm:true});
        res.status(200).send({msg:'success!'});
    }

    const outletSupplies = async (req, res)=> {
        // SupplyModel
        console.log(req.body);
        SupplyModel.find({$and:[{qMonth:req.body.month},
            {qYear:req.body.year},{outlet:req.body.outletCode}]}).sort({created_at:-1}).then((record)=> {
                if(record.length == 0){
                    res.status(404).send({msg:'no record!'});
                }else{
                    res.status(200).send({record:record});
                }
            })
      
    }

    const outletSuppliesdaily = async (req, res)=> {
        // SupplyModel
        console.log(req.body);
        SupplyModel.find({$and:[{qDay: req.body.day},{qMonth:req.body.month},
            {qYear:req.body.year},{outlet:req.body.outletCode}]}).sort({created_at:-1}).then((record)=> {
                if(record.length == 0){
                    res.status(404).send({msg:'no record!'});
                }else{
                    res.status(200).send({record:record});
                }
            })
      
    }
    

    const productionList = async (req, res)=> {
        // SupplyModel
        console.log('production record',req.body);
        prodModel.find({$and:[{qMonth:req.body.month},
            {qYear:req.body.year}]}).sort({created_at:-1}).then((record)=> {
                if(record.length == 0){
                    res.status(404).send({msg:'no record!'});
                }else{
                    res.status(200).send({record:record});
                }
            })
    }

    const prodByDate = async(req, res)=> {
        prodModel.find({$and:[{qMonth:req.body.month},
            {qYear:req.body.year},{qDay:req.body.day}]}).sort({created_at:-1}).then((record)=> {
                if(record.length == 0){
                    res.status(404).send({msg:'no record!'});
                }else{
                    res.status(200).send({record:record});
                }
            })
    }


module.exports = {submitProd,submitReturns, getProduction, sumbitBadStock, supplyOutlet, closeRecord,
                editProduction, UnConfirmProd, confirmProd,editBadStock, outletSupplies, productionList,
                confirmSupply,unConfirmSupply,verifySupply,unVerifySupply, updateSupply, prodByDate,
                outletSuppliesdaily}