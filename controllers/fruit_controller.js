const mongoose = require('mongoose');
const FruitModel = mongoose.model('fruit');
const moment = require('moment');

const registerFruit = async (req, res)=> {
    var newFruit = new FruitModel();
    newFruit.product = req.body.product;
    newFruit.very_big = req.body.very_big;
    newFruit.big = req.body.big;
    newFruit.medium = req.body.medium;
    newFruit.small = req.body.small;
    newFruit.amount = req.body.amount;
    newFruit.very_small = req.body.very_small;
    newFruit.supplier = req.body.supplier;
    newFruit.supplier = req.body.supplier;
    newFruit.kilo = req.body.kg;
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

const editfruitSubmit = async (req, res)=> {
    const fileId = req.body.id;
    FruitModel.findById({_id:fileId}).then((record)=> {
        if (record.admin == req.body.admin){
            record.product = req.body.product;
            record.very_big = req.body.very_big;
            record.big = req.body.big;
            record.medium = req.body.medium;
            record.small = req.body.small;
            record.amount = req.body.amount;
            record.very_small = req.body.very_small;
            record.supplier = req.body.supplier;
            record.supplier = req.body.supplier;
            record.kilo = req.body.kg; 
            record.edit += 1; 
            record.driver = req.body.driver;
            record.admin = req.body.admin;
            record.save(()=> {
                res.status(200).send({msg:'success!'})
            })
        }else{
            res.status(422).send({msg:'not authrorize to edit!'});
        }
    }).catch((err)=> {
        res.status(400).send({msg:'error in process'});
    })

}

const getFruitRecord = async (req, res)=> {
    await FruitModel.find({}).sort({created_at: -1}).limit(20).then((record)=> {
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

const findFruitbyDate = async (req, res)=> {
    console.log(req.body);
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
    console.log(req.body);
    FruitModel.find({$and:[{qMonth:req.body.month},{qYear:req.body.year}]}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
      
    })
   
}




module.exports = { registerFruit, getFruitRecord, verifyFruit,okFruitRecord, findFruitbyDate,
                disproveFruit,editfruitSubmit, thisMonthFruit}