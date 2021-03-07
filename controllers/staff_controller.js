
const mongoose = require('mongoose');
const lodash = require("lodash");
const staffModel = mongoose.model('staff');
const salaryAdvModel = mongoose.model('salary_adv');
const penaltyModel = mongoose.model('penalty');
const payRecordModel = mongoose.model('pay_record');
const merchantProModel = mongoose.model('merchant_pro');
var moment = require('moment');


const submitStaff = async (req, res)=> { 
    let banktoUpp = req.body.bank.toUpperCase();
    var newStaff = new staffModel();
        newStaff.fullname = req.body.fullname;
        newStaff.phone = req.body.phone;
        newStaff.phone = req.body.phone;
        newStaff.bankName = req.body.bankName;
        newStaff.department = req.body.department;
        newStaff.bankAccountName = banktoUpp;
        newStaff.address = req.body.address; 
        newStaff.startDate = req.body.startDate;
        newStaff.location = req.body.location;
        newStaff.admin = req.body.admin;
        if(req.body.location){
            newStaff.location = req.body.location;
        }
        newStaff.bankNumber = req.body.accountNumber;
        newStaff.bankAccountType = req.body.accountType;
        newStaff.save().then((newuser, err)=> {
            if(!err){
              res.status(200).send({msg :'operation successful...'});
            }else{
              res.status(500).send({msg :'Error in user information'});
            }
    
          }).catch((err)=> {
            if(err.errors.bankNumber){
                res.status(422).send({msg :'account number already exist!'});
              }else if(err.errors.fullname){
                res.status(422).send({msg :'fullname already exist!'});
              }else if(err.errors.bankAccountType){
                res.status(422).send({msg :'account type is required!'});
              }else if(err.errors.department){
                res.status(422).send({msg :'department is required!'});
              }else{
                res.status(501).send({msg :'error exist in user information'});
              }
          });
}


            const updateStaff = async (req, res)=> {
                staffModel.findOne({_id: req.body.id}).then((staff)=> {
                    staff.fullname = req.body.fullname;
                    staff.phone = req.body.phone;
                    staff.department = req.body.department;
                    staff.bankName = req.body.bankName;
                    staff.bankNumber = req.body.bankNumber;
                    staff.bankAccountType = req.body.bankAccountType;
                    staff.bankAccountName = req.body.bankAccountName;
                    staff.startDate = req.body.startDate;
                    if(req.body.location){
                        staff.location = req.body.location;
                    }
                    staff.address = req.body.address;
                    staff.admin = req.body.admin;
                    staff.save((err, docs)=> {
                        if(err){
                            res,status(422).send({msg:'error saving staff record'});
                        }else{
                            res.status(200).send({msg: 'record updated successful!'});
                        }
                    })
                })
            }



        const getAllStaff =async (req, res)=> {
            console.log('getAllStaff');
           await  staffModel.find({active : true}).sort({created_at: -1}).then((staff)=> {
                 res.status(200).send({staff: staff});
             });  
        }

        const removedStaff =async (req, res)=> {
            console.log('removed staff');
           await  staffModel.find({active:false}).sort({created_at: -1}).then((staff)=> {
                 res.status(200).send({staff: staff});
             });  
        }

        const getLimitStaff = async (req, res)=> {
            console.log('getLimitStaff');
            staffModel.find({active : true}).sort({created_at: -1}).then((staff)=> {
                res.status(200).send({staff: staff});
            })
        }
        // {$and:[{department:cat},{active: true}]}
        const getStaffByCategory = async (req, res)=> {
            let cat = req.params.cat;
            await   staffModel.find({department:cat}).then((staffs)=> {
                res.status(200).send({staff: staffs});
            });
        }

        const payOutByDepartment = async (req, res)=> {
            let cat = req.params.cat;
            staffModel.find({department:cat}).then((staff)=> {
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
                    newPenalty.created_at = req.body.date;
                    newPenalty.qDay = new Date(req.body.date).getDate();
                    newPenalty.qMonth = new Date(req.body.date).getMonth() + 1;
                    newPenalty.qYear = new Date(req.body.date).getFullYear() ;
                    newPenalty.day = moment(req.body.date).format('l') ;
                    newPenalty.save().then(()=> {
                        res.status(200).send({msg: 'success'});
                    });
                }).catch((err)=> {
                    res.status(422).send({msg:'error saving document!'})
                })
                  
        }

        const salaryAdvance = async (req, res)=> {
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
                newSalaryAdv.created_at = req.body.date;
                newSalaryAdv.qDay = new Date(req.body.date).getDate();
                newSalaryAdv.qMonth = new Date(req.body.date).getMonth() + 1;
                newSalaryAdv.qYear = new Date(req.body.date).getFullYear() ;
                newSalaryAdv.day = moment(req.body.date).format('l') ;
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
            await penaltyModel.find({}).sort({created_at: -1}).limit(25).then((users)=>{
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
            if(document.admin == admin){
               if(document.confirm || document.verify){
                   res.status(422).send({msg:'CANNOT EDIT RECORD!'})
               }else{
                document.amount = amount;
                document.reason = reason;
                document.edit += 1;
                document.save().then(()=>{
                    res.status(200).send({msg:'edit sucess!'})
                })
               }
            }else{
                res.status(422).send({msg:'AUTHORIZATION ERROR!'});
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
        let queryDate = "";
        let dayString = req.body.day.toString();
        let yearString = req.body.year.toString();
        let monthString = req.body.month.toString();
        queryDate = monthString +'/'+dayString+'/'+yearString;
        await penaltyModel.find({day : queryDate}).then((users)=>{
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
        const search = req.body.search;
       await salaryAdvModel.find({"name": {$regex: search, $options:"i"}}, (err, users)=> {
          res.status(200).send({users});
        });

      }

    const  settleSalary = async (req, res)=> {
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
            res.status(422).send({msg:'error in submitting document'});
        })
    }

    const notPaid = async (req, res)=> {
        const fileId = req.params.id;
        staffModel.findById({_id: fileId}).then((staff)=> {
            if(staff){
                staff.not_paid = true;
                staff.settled = false;
            staff.save().then((user)=> {
                res.status(200).send({msg: ' success'});
            })
            } else{
                res.status(200).send({msg:' error processing user!'});
            }
            
        });
    }

    const searchStaff = async (req, res)=> {
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
    salaryAdvModel.find({$and:[{qMonth : req.body.month}
        ,{qYear: req.body.year}]}).sort({created_at: -1}).then((record)=> {
        if(record.length == 0){
            res.status(404).send({msg:'no record!'});
        }else{
            res.status(200).send({record:record});
        }
    });
    }


    const getPersonalPenalty = (req, res)=> {
        console.log(req.body)
         penaltyModel.find({$and:[{user_id: req.body.user_id ,qMonth : req.body.month} 
            ,{qYear: req.body.year}]}).sort({created_at:-1}).then((record)=>{
            if(record.length == 0){
                res.status(404).send({msg:'no record!'});
            }else{
                res.status(200).send({record: record})
            }
        });

    }

    const thisMonthPenalty = async (req, res)=> {
        // penaltyModel.find({$and:[{qMonth : req.body.month} 
        //     ,{qYear: req.body.year}]}).sort({created_at:-1}).then((record)=>{
        //     if(record.length == 0){
        //         res.status(404).send({msg:'no record!'});
        //     }else{
        //         res.status(200).send({record: record})
        //     }
        // });

        // penaltyModel.distinct("name",{$and:[{qMonth : req.body.month} 
        //         ,{qYear: req.body.year}]}).then((record =>{
        //     res.status(200).send({record: record})
        // }));

        // penaltyModel.find({$and:[{qMonth : req.body.month} 
        //         ,{qYear: req.body.year}]}).distinct("name").then((record =>{
        //     res.status(200).send({record: record})
        // }));

        penaltyModel.aggregate([
            // your where clause: note="test2" and notetwo = "meet2"
            {"$match" : {"qYear": req.body.year, "qMonth" : req.body.month}}, 
            // group by key, score to get distinct
            {"$group" : {_id : {user_id:"$user_id", name:"$name"}}}, 
            // Clean up the output
            {"$project" : {_id:0, user_id:"$_id.user_id", name:"$_id.name"}}
        ]).then((record)=> {
            res.status(200).send({record: record})
        })
    }

    // reset all staff acoun to zero and save to payRecord.
    const resetPayRoll = async (req, res)=> {
         await  staffModel.find({}).then((allStaff)=> {
            allStaff.forEach((staff)=> {
                var newPayRecord  = new payRecordModel();
                newPayRecord.penalty = staff.penalty;
                newPayRecord.savings = staff.savings;
                newPayRecord.give = staff.give;
                newPayRecord.advance_salary = staff.advance_salary;
                newPayRecord.not_paid = staff.not_paid;
                newPayRecord.bonus = staff.bonus;
                newPayRecord.bonus = staff.bonus;
                newPayRecord.AmountPaid = staff.AmountPaid;
                newPayRecord.AmountPaid = staff.AmountPaid;
                newPayRecord.fullname = staff.fullname;
                newPayRecord.bankNumber = staff.bankNumber;
                newPayRecord.bankAccountName = staff.bankAccountName;
                newPayRecord.bankAccountType = staff.bankAccountType;
                newPayRecord.department = staff.department;
                newPayRecord.salary = staff.salary;
                newPayRecord.not_paid = staff.not_paid;
                newPayRecord.settled = staff.settled;
                newPayRecord.save().then(()=> {
                    staff.penalty = 0;
                    staff.savings = 0;
                    staff.give = 0;
                    staff.advance_salary = 0;
                    staff.not_paid = false;
                    staff.penalize = false;
                    staff.bonus = 0;
                    staff.AmountPaid = 0;
                    staff.salary = 0;
                    staff.settled = false;
                    staff.save();
                })

            })
         })
         res.status(200).send({msg:'RESET SUCCESSFUL!'})
        
    }

    const getPayRecord = (req, res)=> {
       payRecordModel.find({$and:[{qMonth : req.body.month} 
            ,{qYear: req.body.year}]}).then((record)=> {
                if(record.length == 0){
                    res.status(444).send({msg: ' NO RECORD!'});
                }else{
                    res.status(200).send({record: record});
                }
            })
        
    }

    const recordDepartment = (req, res)=> {
        payRecordModel.find({$and:[{qMonth : req.body.month}
                    ,{qYear: req.body.year},{department:req.body.department}]}).then((record)=> {
                        if(record.length == 0){
                            res.status(444).send({msg: ' no record!'});
                        }else{
                            res.status(200).send({record: record});
                        }
                    }); 
    }

    const verifyPenalty = async (req, res)=> {
      await  penaltyModel.findByIdAndUpdate({_id:req.params.id},{verify: true});
      res.status(200).send({msg:'verification successful!'});
    }

    const unverifyPenalty = async (req, res)=> {
      await  penaltyModel.findByIdAndUpdate({_id:req.params.id},{verify: false});
      res.status(200).send({msg:'unverification!'});
    }

    const confirmPenalty = async (req, res)=> {
      await  penaltyModel.findByIdAndUpdate({_id:req.params.id},{confirm: true});
      res.status(200).send({msg:'confirmation success!'});
    }

    const unConfirmPenalty = async (req, res)=> {
      await  penaltyModel.findByIdAndUpdate({_id:req.params.id},{confirm: false});
      res.status(200).send({msg:'confirmation success!'});
    }

    const changeStatus = async (req, res)=> {
        await staffModel.updateOne({_id: req.body.id}, {active:req.body.active});
        // res.status(200).send({msg:' success'});
        
    }

    const updatePenaltyRemark = async (req, res) => {
       await penaltyModel.updateOne({_id:req.body._id},{treated: req.body.treated});
        res.status(200).send({msg: 'success'});
    }


   const newMerchantPro = (req, res) => {
       console.log(req.body);
       var newMerchantPro = new merchantProModel();
       
   }





module.exports = {penalizeStaff, submitStaff, getAllStaff, getStaffByCategory, deleteStaff,
                getAllPenalize, salaryAdvance, getSalaryAdv, FindSalaryAdvByDate,
            deleteSalaryAdvance, editPenalty, findPenaltyDate, wavePenalty, deletePenalty,
        searchPenalty, searchSalaryAdv, settleSalary, notPaid, searchStaff, getAllPayout,
        setPaymentFalse, setPaymentTrue, payOutByDepartment, getLimitStaff, thisMonthAdvs,
        getPersonalPenalty,
        thisMonthPenalty, resetPayRoll, getPayRecord,recordDepartment, verifyPenalty, unverifyPenalty,
        confirmPenalty,unConfirmPenalty, updateStaff, changeStatus, removedStaff, updatePenaltyRemark}
