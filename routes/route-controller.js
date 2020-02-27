const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller');
const userController = require('../controllers/user_controller');
const OutletController = require('../controllers/outlet-controller');
const staffController =  require('../controllers/staff_controller');
const productController = require('../controllers/distribute-control');

const jwt_helper = require('../config/jwt_helper');
const mongoose  = require('mongoose');
const UserModel = mongoose.model('User');
const fetch = require("node-fetch");

// router.post('/register' , userController.register);
router.post('/login', userController.login);
router.post('/create-user', userController.createUser);

router.get('/disable-user:id', jwt_helper.verifyJwtToken,checkValidUser, userController.disableUser);
router.get('/activate-user:id', jwt_helper.verifyJwtToken,checkValidUser, userController.activateUser);
router.post('/search-username', jwt_helper.verifyJwtToken,checkValidUser, userController.searchUser);
router.get('/delete-user:id', jwt_helper.verifyJwtToken, checkValidUser, userController.deleteUser);
router.get('/delete-outlet:id', jwt_helper.verifyJwtToken, checkValidUser,OutletController.deleteOutlet);
router.get('/get-all-users', jwt_helper.verifyJwtToken,checkValidUser, userController.getAllUsers);
router.post('/create-outlet', jwt_helper.verifyJwtToken, checkValidUser,OutletController.createOutlet);
router.get('/get-all-oulets', jwt_helper.verifyJwtToken, checkValidUser,OutletController.getAll);
router.post('/search-outlet', jwt_helper.verifyJwtToken, checkValidUser,OutletController.searcOutlet);
router.get('/edit-outlet:id', jwt_helper.verifyJwtToken, checkValidUser, OutletController.editOutlet);
router.post('/update-balance', jwt_helper.verifyJwtToken, checkValidUser, userController.updateBalance);
router.post('/submit-expense', jwt_helper.verifyJwtToken, checkValidUser, userController.expenseList);
router.get('/get-expenses', jwt_helper.verifyJwtToken, checkValidUser, userController.getExpense);
router.get('/get-credit', jwt_helper.verifyJwtToken, checkValidUser, userController.getCredit);
router.get('/get-balance', jwt_helper.verifyJwtToken, checkValidUser, userController.getBalance);
router.get('/verify-expense:id', jwt_helper.verifyJwtToken, checkValidUser, userController.verifyExpense);
router.get('/select-expense:cat', jwt_helper.verifyJwtToken, checkValidUser, userController.selectExpenseByCat);
router.get('/delete-expense:id', jwt_helper.verifyJwtToken, checkValidUser, userController.deleteExpense);
router.get('/delete-credit:id', jwt_helper.verifyJwtToken, checkValidUser, userController.deleteCredit);

router.post('/submit-staff', jwt_helper.verifyJwtToken,checkValidUser,staffController.submitStaff);
router.get('/get-all-staff', jwt_helper.verifyJwtToken, checkValidUser,staffController.getAllStaff);
router.get('/select-staff-depart:cat',jwt_helper.verifyJwtToken, checkValidUser, staffController.getStaffByCategory);
router.get('/delete-staff:id', jwt_helper.verifyJwtToken, checkValidUser,staffController.deleteStaff);
router.post('/penalize-staff', jwt_helper.verifyJwtToken,checkValidUser, staffController.penalizeStaff);
router.get('/get-all-penalty', jwt_helper.verifyJwtToken,checkValidUser, staffController.getAllPenalize);
router.post('/submit-prod', jwt_helper.verifyJwtToken, checkValidUser,productController.submitProd);
router.get('/get-production', jwt_helper.verifyJwtToken,checkValidUser, productController.getProduction);
router.post('/submit-bad-stock', jwt_helper.verifyJwtToken,checkValidUser,productController.sumbitBadStock)

 function checkValidUser(req, res, next){
     const userID = req._id;
     UserModel.findById({_id: userID}, (err, user)=> {
         if(user){
             if(user.active){
                next();
             }else{
                 res.status(422).send({msg:"account is currently disabled!"});
             }
         }
     })
    
 }

module.exports = router;