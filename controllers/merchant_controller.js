const mongoose = require('mongoose');
const merchantModel = mongoose.model('merchant');
var moment = require('moment');

const submitRecord = async (req, res)=> {
    let day = moment(req.body.date).format('l') ;
    await merchantModel.find({$and:[{outletCode: req.body.outletCode},
        {merchantName: req.body.merchantName},{day:day}]}).then((merchant)=> {
            if(merchant.length != 0){
                res.status(422).send({msg:'merchant already exist for today!'});
            }else{
        
    var merchantSale = new merchantModel ();
    merchantSale.admin = req.body.admin;
    merchantSale.merchantName = req.body.merchantName;
    merchantSale.outletCode = req.body.outletCode;
    merchantSale.attendant = req.body.attendant;
    merchantSale.bottles = req.body.bottles;
    merchantSale.amountSold = req.body.amountSold;
    merchantSale.created_at = req.body.date;
    merchantSale.qDay = new Date().getDate(req.body.date);
    merchantSale.qMonth = new Date().getMonth(req.body.date) + 1;
    merchantSale.qYear = new Date().getFullYear(req.body.date) ;
    merchantSale.day = moment(req.body.date).format('l') ;
    merchantSale.save().then(()=> { 
        res.status(200).send({msg:'submitted successful!!'});
    }).catch((err)=>{
        console.log(err);
        res.status(422).send({msg:'error submitting record!'});
    })
}
});
}

// const getSalesRecord = async (req, res)=> {
//     console.log('getSalesRecord')
//     merchantModel.find({}).sort({created_at:-1}).then((record)=> {
//         if(record.length == 0){
//             res.status(404).send({msg:'no available record!'});
//         }else{
//             res.status(200).send({record: record});
//         }
//     });
// }

const okSaleRecord = async (req, res)=> {
    const fileId = req.params.id;
    await merchantModel.findByIdAndUpdate({_id:fileId},{confirm: true});
    res.status(200).send({msg:'success!'});
}
const verifySaleRecord = async (req, res)=> {
    const fileId = req.params.id;
    await merchantModel.findByIdAndUpdate({_id:fileId},{verify: true});
    res.status(200).send({msg:'success!'});
}
const disproveSale = async (req, res)=> {
    const fileId = req.params.id;
    await merchantModel.findByIdAndUpdate({_id:fileId},{verify: false});
    res.status(200).send({msg:'success!'});
}

const monthlySales = async (req, res)=> {
    console.log('monthlySales','I SEE SALES')
    merchantModel.find({$and:[{qMonth : req.body.month},{qYear: req.body.year}]}).sort({created_at:-1}).limit(25).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
    });
}

const deleteSales = async (req, res)=> {
    const fileId = req.params.id;
   await merchantModel.findByIdAndRemove({_id: fileId});
   res.status(200).send({msg:'success!'});
}

const getMerchantRecord = async (req, res)=> {
    console.log('getMerchantRecord',req.body);
    merchantModel.find({merchantName: req.body.merchant}).then((merchant)=> {
        res.status(200).send({merchant: merchant});
    });
}

const monthlyMercahntRecord = async (req, res)=> {
    console.log('getByMonth','GET BY MNOTH')
    merchantModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year},{merchantName:req.body.fullname}]}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
    });
}
const dailySales = async (req, res)=> {
    console.log('dailySales','GETTING BY DAY')
    merchantModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year},{qDay:req.body.day}]}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
    });
}

const outletSales = async (req, res)=> {
    console.log('outletSales',req.body);
    merchantModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year},{outletCode:req.body.MerchantCode}]}).sort({created_at:-1}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
    });
}

module.exports = {monthlySales, submitRecord, okSaleRecord, verifySaleRecord,
                deleteSales,outletSales, getMerchantRecord, monthlyMercahntRecord, dailySales, disproveSale}