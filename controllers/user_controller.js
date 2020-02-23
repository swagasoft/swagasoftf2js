const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fetch = require("node-fetch");
const lodash = require("lodash");
const expenseAccountModel = mongoose.model('account');
const expenseListModel = mongoose.model('expense_list');
const creditModel = mongoose.model('credit');



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
        res.status(200).send({docs: document})
      });
     
    }

    const updateBalance = async (req, res)=> {
      let amount = parseInt(req.body.amount);
      var newCredit = new creditModel();
      newCredit.balance = amount;
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
        newAccount.save((result)=> {
          res.status(200).send({msg: 'success', result: result});
        });

      }
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
      await newExpense.save().then(()=> {
        expenseAccountModel.findOne({name : 'BALANCE'},(err, doc)=> {
          if(doc){
            doc.balance = doc.balance - amountInt;
            doc.save().then(()=> {   res.status(200).send({msg: 'get expense list '})})
          }else{
            res.status(200).send({msg: 'expense not recorded..'});
          }
        })
      })

    
      
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

    const verifyExpense = async (req, res)=> {
      let docID = req.params.id;
      console.log(docID);
      expenseListModel.findByIdAndUpdate({_id:docID},{verified : true}).then(()=> {
        res.status(200).send({msg:'document updated successfully'});
      })
    }

    const deleteExpense = async (req, res)=> {
      let docID = req.params.id;
      console.log('delte',docID);
      expenseListModel.findByIdAndRemove({_id:docID}).then(()=> {
        res.status(200).send({msg:'document deleted successfully'});
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
      })
    }




module.exports = {activateUser, login, createUser, getAllUsers, getCredit,
   disableUser, searchUser, deleteUser, updateBalance, expenseList,deleteCredit,
  getExpense, getBalance, verifyExpense, deleteExpense, selectExpenseByCat}