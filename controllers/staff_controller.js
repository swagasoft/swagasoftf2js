
const mongoose = require('mongoose');
const lodash = require("lodash");
const staffModel = mongoose.model('staff');
const salaryAdvModel = mongoose.model('salary_adv');
const penaltyModel = mongoose.model('penalty');
var moment = require('moment');


const submitStaff = async (req, res)=> {
    console.log(req.body);
    let banktoUpp = req.body.bank.toUpperCase();
    var newStaff = new staffModel();
        newStaff.fullname = req.body.fullname;
        newStaff.phone = req.body.phone;
        newStaff.department = req.body.department;
        newStaff.bankAccountName = banktoUpp;
        newStaff.address = req.body.address; 
        newStaff.admin = req.body.admin;
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
              }else if(err.errors.fullname){
                res.status(422).send({msg :'fullname already exist!'});
              }else{
                res.status(501).send({msg :'eror in user information'});
              }
          });
}

        const getAllStaff =async (req, res)=> {
           await  staffModel.find({}).then((staff)=> {
                 res.status(200).send({staff: staff});
             });  
        }

        const getLimitStaff = async (req, res)=> {
            staffModel.find({}).sort({created_at: -1}).limit(40).then((staff)=> {
                res.status(200).send({staff: staff});
            })
        }

        const getStaffByCategory = async (req, res)=> {
            let cat = req.params.cat;
            await   staffModel.find({department:cat}).then((staffs)=> {
                res.status(200).send({staff: staffs});
            });
        }

        const payOutByDepartment = async (req, res)=> {
            let cat = req.params.cat;
            console.log(cat);
            staffModel.find({$and:[{department:cat},{settled:true}]}).then((staff)=> {
                console.log(staff);
                res.status(200).send({staff: staff});
            })
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
            let admin = req.body.admin;
            await staffModel.findByIdAndUpdate({_id:userId},{penalize:true});
                staffModel.findById({_id:userId}).then((user)=> {
                    var newPenalty = new penaltyModel();
                    newPenalty.amount = amount;
                    newPenalty.name = user.fullname;
                    newPenalty.user_id = user._id;
                    newPenalty.admin = admin;
                    newPenalty.reason = reason;
                    newPenalty.save().then(()=> {
                        res.status(200).send({msg: 'success'});
                    });
                }).catch((err)=> {
                    res.status(422).send({msg:'error saving document!'})
                })
                  
        }

        const salaryAdvance = async (req, res)=> {
            console.log(req.body);
            let userId = req.body.id;
            let amount = req.body.values.amount;
            let reason = req.body.values.reason;
            let admin = req.body.admin;
            staffModel.findById({_id:userId}).then((user)=> {
                var newSalaryAdv = new salaryAdvModel();
                newSalaryAdv.amount = amount;
                newSalaryAdv.name = user.fullname;
                newSalaryAdv.user_id = user._id;
                newSalaryAdv.admin = admin;
                newSalaryAdv.reason = reason;
                newSalaryAdv.save().then(()=> {
                    staffModel.findById({_id:userId}).then((staff)=> {
                        staff.advance_salary += parseInt(amount);
                        staff.save(()=>{
                            res.status(200).send({msg: 'success'});
                        })
                    });
                  
                })
            }).catch((err)=> {
                res.status(422).send({msg:'error saving document!'});
            })
                   
                   
        }

        const getAllPenalize = async (req, res)=> {
            await penaltyModel.find({}).sort({created_at: -1}).limit(30).then((users)=>{
                if(users.length == 0){
                    res.status(404).send({msg:"No penalty found"});
                }else{ 
                    res.status(200).send({users:users});
                }
               
            });
        }

        const getSalaryAdv = async (req, res) => {
            await salaryAdvModel.find({}).sort({created_at: -1}).limit(40).then((users)=> {
                if(users.length == 0){
                    res.status(404).send({msg:'no advance salary found!'});
                }else{
                    res.status(200).send({users:users});
                }  
            });
        }

    const editPenalty = async (req, res)=> {
        const amount = req.body.values.amount;
        const reason = req.body.values.reason;
        const admin = req.body.admin;
        penaltyModel.findById({_id:req.body.id}).then((document)=> {
            console.log(admin)
            console.log(document.admin)
            if(document.admin == admin){
                document.amount = amount;
                document.reason = reason;
                document.edit += 1;
                document.save().then(()=>{
                    res.status(200).send({msg:'edit sucess!'})
                })
            }else{
                res.status(422).send({msg:'no permission to edit!'});
            }
        })
    }

    const deleteSalaryAdvance = async (req, res)=>{

        salaryAdvModel.findById({_id:req.body.id}).then((record)=> {
            staffModel.findById({_id:record.user_id}).then((user)=> {
                user.advance_salary = user.advance_salary - record.amount;
                user.save().then(()=> {
                    salaryAdvModel.findByIdAndDelete({_id:req.body.id}).then(()=> {
                        res.status(200).send({msg:'delete sucess!'})
                    })
                }).catch((err)=> {
                    res.status(422).send({msg:'error while deleting record!'})
                })
            })
        })
       
        await salaryAdvModel.findByIdAndUpdate({_id:req.body.id});
        res.status(200).send({msg:'delete sucess!'})

    }


    const FindSalaryAdvByDate = async (req, res)=> {
        let queryDate = "";
        let dayString = req.body.day.toString();
        let yearString = req.body.year.toString();
        let monthString = req.body.month.toString();
        queryDate = monthString +'/'+dayString+'/'+yearString;
        await salaryAdvModel.find({day : queryDate}).then((users)=>{
            if(users.length == 0){
                res.status(404).send({msg:'no record for this day!'});
            }else{
                res.status(200).send({users: users});
            }
        })
       
    }

    const findPenaltyDate = async (req, res)=> {
        console.log(req.body);
        let queryDate = "";
        console.log(typeof(req.body.day));
        let dayString = req.body.day.toString();
        let yearString = req.body.year.toString();
        let monthString = req.body.month.toString();
        queryDate = monthString +'/'+dayString+'/'+yearString;
        await penaltyModel.find({day : queryDate}).then((users)=>{
            console.log(users);
            if(users.length == 0){
                res.status(404).send({msg:'no record for this day!'});
            }else{
                res.status(200).send({users: users});
            }
        })
       
    }

    const wavePenalty = async (req, res)=> {
        let fileId = req.params.id;
        penaltyModel.findById({_id:fileId}).then((document)=> {
            document.wave = true;
            document.save().then(()=> {
                res.status(200).send({msg:'success!'});
            });
        })
        
    }
    
    const deletePenalty = async (req, res)=> {
        let fileId = req.params.id;
      await  penaltyModel.findByIdAndRemove({_id:fileId});
        res.status(200).send({msg:'delete success!'});
    }

    const searchPenalty = async (req, res)=> {
        console.log('file',req.body);
        const search = req.body.search;
       await penaltyModel.find({$and:[{"name": {$regex: search, $options:"i"}}
       ,{qMonth:req.body.month},{qYear:req.body.year}]} ,(err, users)=> {
          if(users.length == 0) {
              res.status(404).send({msg:'no record!'})
          }else{
            res.status(200).send({users});
          }
        });

      }

      const searchSalaryAdv = async (req, res)=> {
        console.log('file',req.body);
        const search = req.body.search;
       await salaryAdvModel.find({"name": {$regex: search, $options:"i"}}, (err, users)=> {
          res.status(200).send({users});
        });

      }

    const  settleSalary = async (req, res)=> {
        console.log(req.body);
        staffModel.findById({_id:req.body.id}).then((staff)=> {
            staff.salary = req.body.salary;
            staff.bonus = req.body.bonus;
            staff.penalty = req.body.penalty;
            staff.savings = req.body.savings;
            staff.savings = req.body.savings;
            staff.give = req.body.give;
            staff.advance_salary = req.body.salary_adv;
            staff.AmountPaid = req.body.amountPaid;
            staff.settled = true;
            staff.not_paid = false;
            staff.save().then(()=>{
                res.status(200).send({msg:'successful!'})
            });
        }).catch((err)=> {
            console.log(err);
            res.status(422).send({msg:'error in submitting document'});
        })
    }

    const notPaid = async (req, res)=> {
        const fileId = req.params.id;
        console.log(fileId);
        staffModel.findById({_id: fileId}).then((staff)=> {
            if(staff){
                staff.not_paid = true;
                staff.settled = false;
            staff.save().then((user)=> {
                console.log(user);
                res.status(200).send({msg: ' success'});
            })
            } else{
                res.status(200).send({msg:' error processing user!'});
            }
            
        });
    }

    const searchStaff = async (req, res)=> {
        console.log(req.body);
        const search = req.body.search;
        staffModel.find({"fullname": {$regex: search, $options:"i"}}, (err, staff)=> {
           
            res.status(200).send({staff: staff});
          });
    }

    const getAllPayout = async (req, res)=> {
        await staffModel.find({settled: true}).then((payout)=> {
            if(payout.length == 0){
                res.status(404).send({msg: ' No record!'});
            }else{
                res.status(200).send({payout:payout});
            }
        });
    }

    const setPaymentFalse = async (req, res)=>{
        const id = req.params.id;
        await  staffModel.findByIdAndUpdate({_id:id},{settled: false});
        res.status(200).send({msg:'success!'});
    }

    const setPaymentTrue = async (req, res)=>{
        const id = req.params.id;
        await  staffModel.findOne({_id:id}).then((staff)=> {
                staff.settled = true;
                staff.not_paid = false;
                staff.save();
        })
        res.status(200).send({msg:'success!'});
    }

    // const advsStaffMonthAndName = async (req, res)=> {
    //     console.log(req.body);
    //     merchantModel.find({$and:[{qMonth : req.body.month}
    //         ,{qYear: req.body.year},{merchantName:req.body.fullname}]}).then((record)=> {
    //         if(record.length == 0){
    //             console.log('record in loop',record)
    //             res.status(404).send({msg:'no record!'});
    //         }else{
    //             console.log(record);
    //             res.status(200).send({record:record});
    //         }
    //     });
    // }

    const thisMonthAdvs = async ( req, res)=> {
        console.log('my month avs',req.body);
    salaryAdvModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year}]}).sort({created_at: -1}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            console.log(record);
            res.status(200).send({record:record});
        }
    });
    }

    const thisMonthPenalty = async (req, res)=> {
        console.log(req.body);
        penaltyModel.find({$and:[{qMonth : req.body.month} 
            ,{qYear: req.body.year}]}).sort({created_at:-1}).then((record)=>{
            if(record.length == 0){
                res.status(404).send({msg:'no record!'});
            }else{
                res.status(200).send({record: record})
            }
        });
    }




module.exports = {penalizeStaff, submitStaff, getAllStaff, getStaffByCategory, deleteStaff,
                getAllPenalize, salaryAdvance, getSalaryAdv, FindSalaryAdvByDate,
            deleteSalaryAdvance, editPenalty, findPenaltyDate, wavePenalty, deletePenalty,
        searchPenalty, searchSalaryAdv, settleSalary, notPaid, searchStaff, getAllPayout,
        setPaymentFalse, setPaymentTrue, payOutByDepartment, getLimitStaff, thisMonthAdvs,
        thisMonthPenalty}