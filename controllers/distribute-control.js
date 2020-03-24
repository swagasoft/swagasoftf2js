

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
            console.log('new prod one', record);
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
        doc.who_bad_stock = req.body.admin;
        doc.bad_p += req.body.bad_p;
        doc.bad_o += req.body.bad_o;
        doc.bad_w += req.body.bad_w;
        doc.bad_t += req.body.bad_t;
        doc.bad_c += req.body.bad_c;
        doc.bad_s += req.body.bad_s;
        doc.bad_slg += req.body.bad_slg;
        // update balance stock
        doc.bal_p - doc.bad_p;
        doc.bal_o - doc.bad_o;
        doc.bal_w - doc.bad_w;
        doc.bal_t - doc.bad_t;
        doc.bal_c - doc.bad_c;
        doc.bal_s - doc.bad_s;
        doc.bal_slg - doc.bad_slg;
        doc.save().then(()=> {
            res.status(200).send({msg:'submitted successfully'});
        }).catch((err)=> {
            console.log(err);
            res.status(422).send({msg:'something went wrong'});
        });
    });
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
            console.log('after save', prod);
     

    var newSupply = new SupplyModel();
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
         console.log(findUser);
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
            });
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

    const editProduction = async (req, res)=> {
        console.log(req.body);
        res.status(200).send({msg:' confirm'})
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
    
    const productionList = async (req, res)=> {
        // SupplyModel
        console.log(req.body);
        prodModel.find({$and:[{qMonth:req.body.month},
            {qYear:req.body.year}]}).sort({created_at:-1}).then((record)=> {
                if(record.length == 0){
                    res.status(404).send({msg:'no record!'});
                }else{
                    res.status(200).send({record:record});
                }
            })
      
    }


module.exports = {submitProd,submitReturns, getProduction, sumbitBadStock, supplyOutlet, closeRecord,
                editProduction, UnConfirmProd, confirmProd, outletSupplies, productionList}