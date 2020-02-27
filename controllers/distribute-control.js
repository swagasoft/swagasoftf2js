

const mongoose = require('mongoose');
const lodash = require("lodash");
const prodModel = mongoose.model('production');

const submitProd = async (req, res)=> {
    console.log(req.body);
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
const getProduction = async (req, res)=> {
        prodModel.findOne({close : false}).sort({created_at:1}).then((documents)=> {
            res.status(200).send({docs: documents});
        });
        }
const sumbitBadStock = async (req, res)=> {
    console.log(req.body);
    await prodModel.findById({_id:req.body.id}).then((doc)=> {
        doc.bad_p = req.body.bad_p;
        doc.bad_o = req.body.bad_o;
        doc.bad_w = req.body.bad_w;
        doc.bad_t = req.body.bad_t;
        doc.bad_c = req.body.bad_c;
        doc.bad_s = req.body.bad_s;
        doc.bad_slg = req.body.bad_slg;
        doc.save().then(()=> {
            res.status(200).send({msg:'i see you'});
        }).catch((err)=> {
            console.log(err);
            res.status(422).send({msg:'something went wrong'});
        });
    });
   
}
module.exports = {submitProd, getProduction, sumbitBadStock}