const mongoose = require('mongoose');
const FruitModel = mongoose.model('fruit');
const moment = require('moment');

const registerFruit = async (req, res)=> {
    var newFruit = new FruitModel();
    newFruit.product = req.body.product;
    newFruit.quantity = req.body.quantity;
    newFruit.buyer = req.body.buyer;
    newFruit.assist_buyer = req.body.assist_buyer;
    newFruit.supplier = req.body.supplier;
    newFruit.confirmed_by = req.body.confirmed_by;
    newFruit.bottles = req.body.bottles;
    newFruit.paid_for = req.body.paid_for;
    newFruit.remark = req.body.remark;
    newFruit.damage = req.body.damage;
    newFruit.size = req.body.size;
    newFruit.kilo = req.body.kg;
    newFruit.amount = req.body.amount;
    newFruit.driver = req.body.driver;
    newFruit.admin = req.body.admin;
    newFruit.created_at = req.body.date;
    newFruit.qDay = new Date().getDate(req.body.date);
    newFruit.qMonth = new Date().getMonth(req.body.date) + 1;
    newFruit.qYear = new Date().getFullYear(req.body.date) ;
    newFruit.day = moment(req.body.date).format('l') ;
    newFruit.save().then(()=> {
        res.status(200).send({msg:'i see you'})
    }).catch((err)=> {
        console.log(err);
        res.status(422).send({msg:"error in document!"});
    });
}

const editfruitSubmit =  (req, res)=> {
    const fileId = req.body.id;
    console.log(req.body);
   FruitModel.findById({_id:fileId}).then((record)=> {
        if (record.admin == req.body.admin){
            if(record.confirm || record.verify){
                res.status(412).send({msg:'sorry, edit access is cloded!'})
            }else{
            
            record.edit += 1;
            record.product = req.body.product;
            record.quantity = req.body.quantity;
            record.buyer = req.body.buyer;
            record.assist_buyer = req.body.assist_buyer;
            record.supplier = req.body.supplier;
            record.confirmed_by = req.body.confirmed_by;
            record.bottles = req.body.bottles;
            record.paid_for = req.body.paid_for;
            record.remark = req.body.remark;
            record.damage = req.body.damage;
            record.size = req.body.size;
            record.kilo = req.body.kg;
            record.amount = req.body.amount;
            record.driver = req.body.driver;
            record.admin = req.body.admin;
            record.save().then(()=> {
                res.status(200).send({msg:'success!'})
            }).catch((err)=> console.log(err))
                
        }
            // end
        }else{
            res.status(422).send({msg:'not authrorize to edit!'});
        }
    }).catch((err)=> {
        res.status(400).send({msg:'error in process'});
    })

}

const getFruitRecord = async (req, res)=> {
    console.log('getFruitRecord')
    await FruitModel.find({}).sort({created_at: -1}).limit(50).then((record)=> {
        res.status(200).send({record: record});
    })
}

const verifyFruit = async (req, res)=> {
    let fileId = req.params.id;
    await FruitModel.findByIdAndUpdate({_id:fileId},{verify: true});
    res.status(200).send({msg:'success'});
}

const disproveFruit = async (req, res)=> {
    let fileId = req.params.id;
    await FruitModel.findByIdAndUpdate({_id:fileId},{verify: false});
    res.status(200).send({msg:'success'});
}

const okFruitRecord = async (req, res)=> {
    let fileId = req.params.id;
    await FruitModel.findByIdAndUpdate({_id:fileId},{confirm: true});
    res.status(200).send({msg:'success'});
}
const UnokFruitRecord = async (req, res)=> {
    let fileId = req.params.id;
    await FruitModel.findByIdAndUpdate({_id:fileId},{confirm: false});
    res.status(200).send({msg:'success'});
}

const findFruitbyDate = async (req, res)=> {
    console.log('findFruitbyDate',req.body);
    let queryDate = "";
    console.log(typeof(req.body.day));
    let dayString = req.body.day.toString();
    let yearString = req.body.year.toString();
    let monthString = req.body.month.toString();
    queryDate = monthString +'/'+dayString+'/'+yearString;
    await FruitModel.find({day : queryDate}).then((record)=>{
        if(record.length == 0){
            res.status(404).send({msg:'no record for this day!'});
        }else{
            res.status(200).send({record: record});
        }
    });
}

const thisMonthFruit = (req, res)=> {
    console.log('this month',req.body);
    FruitModel.find({$and:[{qMonth:req.body.month},
        {qYear:req.body.year}]}).sort({created_at:-1}).limit(25).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
      
    })
   
}




module.exports = { registerFruit, getFruitRecord, verifyFruit,okFruitRecord, findFruitbyDate,
                disproveFruit,editfruitSubmit, thisMonthFruit, UnokFruitRecord}