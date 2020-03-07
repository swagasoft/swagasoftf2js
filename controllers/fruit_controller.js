const mongoose = require('mongoose');
const FruitModel = mongoose.model('fruit');

const registerFruit = async (req, res)=> {
    console.log(req.body);
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
    newFruit.save().then(()=> {
        res.status(200).send({msg:'i see you'})
    }).catch((err)=> {
        console.log(err);
        res.status(422).send({msg:"error in document!"});
    });
   
}

const getFruitRecord = async (req, res)=> {
    await FruitModel.find({}).sort({created_at: -1}).limit(20).then((record)=> {
        res.status(200).send({record: record});
    })
}



module.exports = { registerFruit, getFruitRecord}