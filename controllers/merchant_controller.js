const mongoose = require('mongoose');
const merchantModel = mongoose.model('merchant');
const merchantProModel = mongoose.model('merchant_pro');
var moment = require('moment');

const submitRecord = async (req, res)=> {
 try {
     
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
    merchantSale.m_rate = req.body.rate;
    merchantSale.qDay = new Date(req.body.date).getDate();
    merchantSale.qMonth = new Date(req.body.date).getMonth() + 1;
    merchantSale.qYear = new Date(req.body.date).getFullYear() ;
    merchantSale.day = moment(req.body.date).format('l') ;
    merchantSale.save().then(( data)=> { 
        res.status(200).send({msg:'submitted successful!!'});
    }).catch((err)=>{
        console.log(err);
        res.status(422).send({msg:'error submitting record!'});
    })
}
});
 } catch (error) {
    res.status(422).send({msg:'extra value required!'});
 }
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
            res.status(404).send({msg:'no record for selected month!'});
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
    merchantModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year},{merchantName:req.body.merchant}]}).then((merchant)=> {
        if(merchant.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({merchant:merchant});
        }
    });
}

const monthlyMercahntRecord = async (req, res)=> {
    console.log('getByMonth','GET BY MNOTH',req.body)
    merchantModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year},{merchantName:req.body.merchant}]}).then((record)=> {
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
            res.status(404).send({msg:'No sales for selected date!'});
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
            res.status(404).send({msg:'No sales for selected date'});
        }else{
            res.status(200).send({record:record});
        }
    });
} 


const resetMerchantPrice = async (req, res)=> {
    console.log(' here....',req.body);
    merchantModel.findOne({_id: req.body.id}).then((record)=> {
        console.log(record);
        record.amountSold = req.body.amount;
        record.m_rate = req.body.rate;
        record.save().then((record)=> {
            res.status(200).send({data : record});
        });
    });
}

const submitMerchantPro = (req, res)=> {
    console.log(req.body);
    console.log(req.body.list);
   let storeList = [];
    storeList = req.body.list;
   let storeRate = req.body.rate;
    var newMerchantPro = new merchantProModel();
    newMerchantPro.merchantName = req.body.name;
    newMerchantPro.group = req.body.group;
    newMerchantPro.qMonth = req.body.month;
    newMerchantPro.qYear = req.body.year;
    
    storeList.forEach(element => {
            newMerchantPro.mixed.push({store:element, bottles: 0, rate: 0});
    });
    newMerchantPro.save().then((data)=> {
        res.status(200).send({data: data});
    });
}


// const updateBottles = async (req, res)=> {
//     console.log(req.body);

//     merchantProModel.updateOne({'mixed._id': req.body._id}).then(record => {
//         console.log('THIS ',record);
  
//   let dataStore  =  record.mixed.filter(item => item._id === req.body.id);
//   console.log("data ", dataStore)
//   res.status(200).send(dataStore);
//     });

// }

const updateBottles = async (req, res)=> {
    console.log(req.body);

    merchantProModel.updateOne({_id: req.body.masterId, "mixed._id": req.body._id},
     {$set: {"mixed.$.bottles": req.body.bottles} }).then((result)=> {
         console.log('RESULT ', result)
        res.status(200).send(result);
     })
}

// const updateBottles = async (req, res)=> {
//     console.log(req.body);

//     const documentId = req.body._id;
//     merchantProModel.findOne({_id:req.body.masterId},
//         {_id:0, mixed :{$elemMatch: {store : req.body.store} }}).then(result => {
//             // console.log(result);
//             console.log('bottles', result);
          
//             res.status(200).send(result);
//         })

// }


const getMerchantPro = (req, res)=> {
    console.log(req.body);
    merchantProModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year}]}).then((data)=> {
            res.status(200).send({data});
        })
}

module.exports = {monthlySales, submitRecord, okSaleRecord, verifySaleRecord, resetMerchantPrice,
                deleteSales,outletSales, getMerchantRecord, monthlyMercahntRecord, dailySales, disproveSale,
                submitMerchantPro, getMerchantPro, updateBottles}