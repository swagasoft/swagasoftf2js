
const mongoose = require('mongoose');
const lodash = require("lodash");
const staffModel = mongoose.model('staff');


const submitStaff = async (req, res)=> {
    console.log(req.body);
    let banktoUpp = req.body.bank.toUpperCase();
    let salarytoInt = parseInt( req.body.salary);
    var newStaff = new staffModel();
        newStaff.fullname = req.body.fullname;
        newStaff.phone = req.body.phone;
        if(req.body.department !== 'MERCHANDISER'){
            newStaff.salary = salarytoInt;
        }
        newStaff.department = req.body.department;
        newStaff.bankAccountName = banktoUpp;
        newStaff.address = req.body.address; 
        newStaff.bankNumber = req.body.accountNumber;
        newStaff.bankAccountType = req.body.accountType;
        newStaff.save().then((newuser, err)=> {
            if(!err){
                console.log('no error', newuser);
              res.status(200).send({msg :'operation successful...'});
            }else{
              res.status(500).send({msg :'Error in user information'});
            }
    
          }).catch((err)=> {
            console.log('ERRORR',err);
            if(err.errors.bankNumber){
              res.status(422).send({msg :'account number already exist!'});
            }else{
              res.status(501).send({msg :'eror in user information'});
            }
          });
    
}

        const getAllStaff =async (req, res)=> {
           await  staffModel.find({}).then((staffs)=> {
                 res.status(200).send({staff: staffs});
             });  
        }

        const getStaffByCategory = async (req, res)=> {
            let cat = req.params.cat;
            await   staffModel.find({department:cat}).then((staffs)=> {
                res.status(200).send({staff: staffs});
            });
        }

        const deleteStaff = async ( req, res)=> {
            let id = req.params.id;
            await staffModel.findByIdAndRemove({_id: id}).then(()=> {
                res.status(200).send({msg:'deleted successful'});
            });
        }

        const penalizeStaff = async (req, res)=> {
            console.log(req.body);
            let userId = req.body.id;
            let amount = req.body.values.amount;
            let reason = req.body.values.reason;
            // console.log(amount);
            // console.log(reason);
         await staffModel.findById({_id:userId}).then((user)=> {
                user.penalty = user.penalty + amount;
                user.offence = reason;
                user.save().then(()=> {
                    res.status(200).send({msg: 'success'});
                });
            });
        }

        const getAllPenalize = async (req, res)=> {
            await staffModel.find({penalty :{$gt:0}}).then((users)=>{
                res.status(200).send({users:users});
            });
        }




module.exports = {penalizeStaff, submitStaff, getAllStaff, getStaffByCategory, deleteStaff,
                getAllPenalize}