const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fetch = require("node-fetch");
const lodash = require("lodash");
var moment = require('moment');
const expenseAccountModel = mongoose.model('account');
const expenseListModel = mongoose.model('expense_list');
const creditModel = mongoose.model('credit');
const expenseTwoModel = mongoose.model('expense_two');



// login controller
const login = (req, res, done)=> {
    let phone = req.body.number;
    let password = req.body.password;
    UserModel.findOne({phone:phone},(errr, user)=> {
      //  unknown user
      if(!user){
        res.status(404).send([' User not exist.']);
      }else{
    let AppUser = user.phone;
    let databasePassword = user.password;
    let decrypePass = cryptr.decrypt(databasePassword);
    
        if(decrypePass === password){
          token = user.generateJwt(user);
          // send user role to client...
          res.json({"token":token ,  doc: lodash.pick(user, ['role','user_id', 'balance','email','username'])});
    
        }else{
          res.status(401).send([ ' Invalid User Credentials.']);
        }
    }
    });
    }

    const createUser = (request , response)=> {
      console.log(request.body);
      if(request.body.role){

    var  user = new UserModel();
      user.phone = request.body.phone;
      user.username = request.body.username.toLowerCase();
      user.role = request.body.role;
      let crypePassword = cryptr.encrypt(request.body.password);
      user.password = crypePassword;
      user.save().then((newuser, err)=> {
        if(!err){
          response.status(200).send(['operation successful...']);
        }else{
          response.status(500).send(['Error in user information']);
        }

      }).catch((err)=> {
        console.log(err);
        if(err.errors.username){
          response.status(422).send(['Username has been taken!']);
        }else if(err.errors.phone){
          response.status(499).send(['Phone number has been used or has error!']);
        }else if(err.errors.role){
          response.status(499).send([' Role not  submitted!']);
        }else{
          response.status(501).send(['eror in user information']);
        }
      });
    }else{
      response.status(499).send([' Role not  submitted!']);
    }
    }

    const getAllUsers = (req, res)=> {
      UserModel.find({}, (err, users)=> {
        res.status(200).send({users:users})
      });
    }

    const disableUser = async (req, res)=> {
      const userID = req.params.id;
      await UserModel.findByIdAndUpdate({_id: userID}, ({$set:{active: false}}));
     
      res.status(200).send({msg:'account is now disabled'});
    }
     const activateUser = async (req, res)=> {
      const userID = req.params.id;
      await UserModel.findByIdAndUpdate({_id: userID}, ({$set:{active: true}}));
      console.log(userID);

      res.status(200).send({msg:'account is now active!'});
    }
    const deleteUser =  async (req, res)=> {
      const user_ID = req.params.id;
      console.log('delete user', user_ID );
      await UserModel.findByIdAndDelete({_id: user_ID} ).then(()=> {
        res.status(200).send({msg:'user removed successfully...'});
      });
    }

    const searchUser = async(req, res)=> {
      console.log(req.body);
      const username = req.body.user;
      UserModel.find({"username": {$regex: username, $options:"i"}}, (err, document)=> {
        res.status(200).send({docs: document});
      });
     
    }

    const updateBalance = async (req, res)=> {
      console.log(req.body);
      let amount = parseInt(req.body.amount);
      var newCredit = new creditModel();
      newCredit.balance = amount;
      newCredit.admin = req.body.admin;
      newCredit.created_at = req.body.date;
      newCredit.qDay = new Date().getDate(req.body.date);
      newCredit.qMonth = new Date().getMonth(req.body.date) + 1;
      newCredit.qYear = new Date().getFullYear(req.body.date) ;
      newCredit.day = moment(req.body.date).format('l') ;
      await newCredit.save();
    
    expenseAccountModel.findOne({name:'BALANCE'}, (err, doc)=> {
      if(doc){
        doc.balance = doc.balance + amount;
        doc.save().then((result)=> {
          console.log(result);
          res.status(200).send({msg: 'success', result: result});
        });
      }else{
        var newAccount = new expenseAccountModel();
        newAccount.name = req.body.name;
        newAccount.balance = req.body.amount; 
        newAccount.created_at = req.body.date;
        newAccount.qDay = new Date().getDate(req.body.date);
        newAccount.qMonth = new Date().getMonth(req.body.date) + 1;
        newAccount.qYear = new Date().getFullYear(req.body.date) ;
        newAccount.day = moment(req.body.date).format('l') ;
        newAccount.save((result)=> {
          res.status(200).send({msg: 'success', result: result});
        });

      }
    })
    }


    const lastCredit = (req, res)=> {
      creditModel.findOne({}).sort({created_at: -1}).then((credit)=> {
        res.status(200).send({credit});
      })
    }


    const expenseList = async (req, res)=>{
        let amountInt = parseInt(req.body.amountPaid);
       console.log(req.body);
      var newExpense = new expenseListModel();
      newExpense.description = req.body.description;
      newExpense.product = req.body.product;
      newExpense.amountPaid = req.body.amountPaid;
      newExpense.receiver = req.body.receiver;
      newExpense.admin = req.body.admin;
      newExpense.created_at = req.body.date;
      newExpense.information = req.body.information;
      newExpense.qDay = new Date().getDate(req.body.date);
      newExpense.qMonth = new Date().getMonth(req.body.date) + 1;
      newExpense.qYear = new Date().getFullYear(req.body.date) ;
      newExpense.day = moment(req.body.date).format('l') ;
      await newExpense.save().then(()=> {
        expenseAccountModel.findOne({name : 'BALANCE'},(err, doc)=> {
          if(doc){
            doc.balance = doc.balance - amountInt;
            doc.save().then(()=> {   res.status(200).send({msg: 'get expense list '})})
          }else{
            res.status(200).send({msg: 'expense not recorded..'});
          }
        })
      }).catch((err)=> {
        res.status(422).send({msg:'error saving record'});
      })
    }

    const updateExpenseTwo = async (req, res)=> {
      console.log(req.body,'expense 2')
      expenseTwoModel.findById({_id:req.body.id}).then((record)=> {
        if(record.confirm || record.verify){
          res.status(422).send({msg:'edit is closed!'});
        }else{
        if(record.admin == req.body.admin){
          record.edit += 1;
          record.description = req.body.description;
          record.product = req.body.product;
          record.product = req.body.product;
          record.amountPaid = req.body.amountPaid;
          record.receiver = req.body.receiver;
          record.information = req.body.information;
          record.save().then(()=> {
            res.status(200).send({msg:'edited successful!y'})
          })
          // ens else
        }else{
          res.status(412).send({msg:'unauthorize!'});
        }
      }

        });
    }

    const updateExpense = async(req, res)=> {
      let oldExpense = await expenseListModel.findById({_id:req.body.id});
      expenseListModel.findById({_id:req.body.id}).then((record)=> {
      if(record.admin == req.body.admin){
        if(record.confirm || record.verify){
          res.status(422).send({msg:'EDIT PERIOD CLOSED!'})
        }else{

        record.edit += 1;
        record.description = req.body.description;
        record.product = req.body.product;
        record.product = req.body.product;
        record.amountPaid = req.body.amountPaid;
        record.receiver = req.body.receiver;
        record.information = req.body.information;
        record.save().then((editedexpense)=> {
          console.log('old',oldExpense)
          console.log('new',editedexpense)
          expenseAccountModel.findOne({}).then((account)=> {
            account.balance += oldExpense.amountPaid;
            account.balance -= editedexpense.amountPaid;
            account.save(()=> {
              res.status(200).send({msg:'edited successful!y'})
            })
          });

        })
      }
        // ens else
      }else{
        res.status(412).send({msg:'unauthorize!'});
      }
      });
    }

    const getCredit = async (req, res)=> {
      creditModel.find({}).sort({created_at : -1}).limit(20).then((credits)=> {
        res.status(200).send({credits});
      });

    }

   const  getBalance = async (req, res)=> {
      expenseAccountModel.find({}).select('balance').then((balance)=> {
        res.status(200).send({balance});
      })
    }
    
    const getExpense = async (req, res)=> {
      expenseListModel.find({}).sort({created_at : -1}).limit(30).then((expenses)=> {
        res.status(200).send({expenses});
      });
    }

    const thisMonthExpense = async (req, res)=> {
      console.log('my month avs',req.body);
      expenseListModel.find({$and:[{qMonth : req.body.month}
          ,{qYear: req.body.year}]}).sort({created_at: -1}).then((record)=> {
          if(record.length == 0){
              res.status(404).send({msg:'no record!'});
          }else{
              console.log(record);
              res.status(200).send({record:record});
          }
      });
    }

    const confirmExpense = async (req, res)=> {
      console.log(req.params.id);
    await  expenseListModel.findByIdAndUpdate({_id:req.params.id},{confirm:true});
      res.status(200).send({msg:'success'});
    }

    const unConfirmExpense = async (req, res)=> {
      console.log(req.params.id);
    await  expenseListModel.findByIdAndUpdate({_id:req.params.id},{confirm:false});
      res.status(200).send({msg:'success'});
    }

    const verifyExpense = async (req, res)=> {
      let docID = req.params.id;
      console.log(docID);
      expenseListModel.findByIdAndUpdate({_id:docID},{verified : true}).then(()=> {
        res.status(200).send({msg:'document updated successfully'});
      })
    }

    const reverseExpense = async (req, res)=> {
        console.log(req.body);
        let currentUser = req.body.admin;

     await expenseListModel.findById({_id:req.body.id}).then((doc)=> {
        doc.verified = false;
        doc.save().then(()=> {
          res.status(200).send({msg:'expense reversed success'});
        })
        
    
       
      });
    }

   const deleteCredit = async (req, res)=> {
     let docID = req.params.id;
     creditModel.findByIdAndRemove({_id: docID}).then(()=> {
       res.status(200).send({msg : 'delete successful'});
     });
   }

    const selectExpenseByCat = async (req, res)=> {
      let cat = req.params.cat;
      console.log(cat);
      expenseListModel.find({verified: cat},(err, expenses)=> {
        res.status(200).send({expenses});
      });
    }

    const searcExpense = async(req, res)=> {
      console.log('file',req.body);
      const search = req.body.search;
      await expenseListModel.find({$and:[{"information": {$regex: search, $options:"i"}}
      ,{qMonth:req.body.month},{qYear:req.body.year}]} ,(err, expenses)=> {
         if(expenses.length == 0) {
             res.status(404).send({msg:'no record!'})
         }else{
           res.status(200).send({expenses:expenses});
         }
       });
  
    }

    const getUserDetails = async (req, res)=> {
     await UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          res.status(200).send({user: user});
        }else{
          res.status(404).send({msg:'user not found!'});
        }
      });
    }

    const resetPassword = async (req, res)=> {
      let crypePassword = cryptr.encrypt(req.body.values.password);
      UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          user.password = crypePassword;
          user.save().then(()=> {
            res.status(200).send({msg: 'PASSWORD HAS BEEN CHANGED!'})
          });
        }else{
          res.status(422).send({msg:'error while trying to change password!'})
        }
      });
     
    }

    const findExpensebyDate = async (req, res)=> {
      console.log(req.body);
      let queryDate = "";
      let dayString = req.body.dp.day.toString();
      let yearString = req.body.dp.year.toString();
      let monthString = req.body.dp.month.toString();
      queryDate = monthString +'/'+dayString+'/'+yearString;
      console.log('dateee',queryDate);
      await expenseListModel.find({day : queryDate}).then((expenses)=>{
          console.log(expenses);
          if(expenses.length == 0){
              res.status(404).send({msg:'no record for this day!'});
          }else{
              res.status(200).send({expenses: expenses});
          }
      })
    }



    const returnExpense = async (req, res)=> {
      let amountInt = parseInt(req.body.amountPaid);
      console.log(req.body);
     var newExpense = new expenseListModel();
     newExpense.return =  true;
     newExpense.description = req.body.description;
     newExpense.product = req.body.product;
     newExpense.amountPaid = req.body.amountPaid;
     newExpense.receiver = req.body.receiver;
     newExpense.admin = req.body.admin;
     newExpense.created_at = req.body.date;
     newExpense.information = req.body.information;
     newExpense.qDay = new Date().getDate(req.body.date);
     newExpense.qMonth = new Date().getMonth(req.body.date) + 1;
     newExpense.qYear = new Date().getFullYear(req.body.date) ;
     newExpense.day = moment(req.body.date).format('l') ;
     await newExpense.save().then(()=> {
       expenseAccountModel.findOne({name : 'BALANCE'},(err, doc)=> {
         if(doc){
           doc.balance += amountInt;
           doc.save().then(()=> {   res.status(200).send({msg: 'success!'})})
         }else{
           res.status(200).send({msg: 'return saved, but not deducted'});
         }
       })
     }).catch((err)=> {
       res.status(422).send({msg:'error saving record'});
     })
    }

const submitExpense2 =async  (req, res)=> {
  console.log(req.body);
    let amountInt = parseInt(req.body.amountPaid);
   console.log(req.body);
  var newExpense = new expenseTwoModel();
  newExpense.description = req.body.description;
  newExpense.product = req.body.product;
  newExpense.amountPaid = req.body.amountPaid;
  newExpense.receiver = req.body.receiver;
  newExpense.admin = req.body.admin;
  newExpense.created_at = req.body.date;
  newExpense.information = req.body.information;
  newExpense.qDay = new Date().getDate(req.body.date);
  newExpense.qMonth = new Date().getMonth(req.body.date) + 1;
  newExpense.qYear = new Date().getFullYear(req.body.date) ;
  newExpense.day = moment(req.body.date).format('l') ;
  await newExpense.save().then(()=> {
    
  res.status(200).send({msg:'success!'});
  }).catch((err)=> {
    console.log(err);
    res.status(422).send({msg:'error saving record!'});
  });

}

const getExpense2 = async (req, res)=> {
  expenseTwoModel.find({$and:[{qMonth : req.body.month}
    ,{qYear: req.body.year}]}).sort({created_at: -1}).then((record)=> {
    if(record.length == 0){
        res.status(404).send({msg:'no record!'});
    }else{
        console.log(record);
        res.status(200).send({record:record});
    }
});

}

const expense2byDate = async (req, res)=> {
  console.log(req.body);
  let queryDate = "";
  let dayString = req.body.dp.day.toString();
  let yearString = req.body.dp.year.toString();
  let monthString = req.body.dp.month.toString();
  queryDate = monthString +'/'+dayString+'/'+yearString;
  console.log('dateee',queryDate);
  await expenseTwoModel.find({day : queryDate}).then((expenses)=>{
      console.log(expenses);
      if(expenses.length == 0){
          res.status(404).send({msg:'no record for this day!'});
      }else{
          res.status(200).send({expenses: expenses});
      }
  })
}


module.exports = {activateUser, login, createUser, getAllUsers, getCredit, expense2byDate,
   disableUser, searchUser, deleteUser, updateBalance, expenseList,deleteCredit,
  getExpense, getBalance, verifyExpense, reverseExpense, selectExpenseByCat,updateExpenseTwo,
  searcExpense, getUserDetails, resetPassword,findExpensebyDate, thisMonthExpense ,
  confirmExpense, updateExpense, returnExpense, lastCredit, submitExpense2, getExpense2,
  unConfirmExpense}