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

// router.get('/disable-user:id', jwt_helper.verifyJwtToke, userController.disableUser);
// router.get('/activate-user:id', jwt_helper.verifyJwtToke, userController.activateUser);
router.post('/search-username', jwt_helper.verifyJwtToken, userController.searchUser);
router.get('/delete-user:id', jwt_helper.verifyJwtToken, userController.deleteUser);
router.get('/delete-outlet:id', jwt_helper.verifyJwtToken,OutletController.deleteOutlet);
router.get('/get-all-users', jwt_helper.verifyJwtToken, userController.getAllUsers);
router.post('/create-outlet', jwt_helper.verifyJwtToken,OutletController.createOutlet);
router.get('/get-all-oulets', jwt_helper.verifyJwtToken,OutletController.getAll);
router.post('/search-outlet', jwt_helper.verifyJwtToken,OutletController.searcOutlet);
router.get('/edit-outlet:id', jwt_helper.verifyJwtToken, OutletController.editOutlet);
router.post('/update-balance', jwt_helper.verifyJwtToken, userController.updateBalance);
router.post('/submit-expense', jwt_helper.verifyJwtToken, userController.expenseList);
router.get('/get-expenses', jwt_helper.verifyJwtToken, userController.getExpense);
router.get('/get-credit', jwt_helper.verifyJwtToken, userController.getCredit);
router.get('/get-balance', jwt_helper.verifyJwtToken, userController.getBalance);
router.get('/verify-expense:id', jwt_helper.verifyJwtToken,  userController.verifyExpense);
router.get('/select-expense:cat', jwt_helper.verifyJwtToken, userController.selectExpenseByCat);
router.post('/reverse-expense', jwt_helper.verifyJwtToken, userController.reverseExpense);
router.get('/delete-credit:id', jwt_helper.verifyJwtToken, userController.deleteCredit);
router.post('/search-expense', jwt_helper.verifyJwtToken,userController.searcExpense);
router.post('/submit-staff', jwt_helper.verifyJwtToken,staffController.submitStaff);
router.get('/get-all-staff', jwt_helper.verifyJwtToken,staffController.getAllStaff);
router.get('/select-staff-depart:cat',jwt_helper.verifyJwtToken, staffController.getStaffByCategory);
router.get('/delete-staff:id', jwt_helper.verifyJwtToken,staffController.deleteStaff);
router.post('/penalize-staff', jwt_helper.verifyJwtToken, staffController.penalizeStaff);
router.post('/salary-advance', jwt_helper.verifyJwtToken, staffController.salaryAdvance);
router.get('/get-salary-adv', jwt_helper.verifyJwtToken,staffController.getSalaryAdv);
router.get('/get-all-penalty', jwt_helper.verifyJwtToken, staffController.getAllPenalize);
router.post('/submit-prod', jwt_helper.verifyJwtToken,productController.submitProd);
router.get('/get-production', jwt_helper.verifyJwtToken, productController.getProduction);
router.post('/submit-bad-stock', jwt_helper.verifyJwtToken,productController.sumbitBadStock)
router.get('/find-outlet:id', jwt_helper.verifyJwtToken,OutletController.findOutletbyId);
router.post('/supply-outlet', jwt_helper.verifyJwtToken,productController.supplyOutlet);
router.get('/close-record:id', jwt_helper.verifyJwtToken,productController.closeRecord);
router.get('/get-all-staff', jwt_helper.verifyJwtToken,staffController.getAllStaff);
router.post('/find-salary-advbydate', jwt_helper.verifyJwtToken, staffController.FindSalaryAdvByDate);
router.post('/edit-salary-advance', jwt_helper.verifyJwtToken, staffController.editSalaryAdvance);
router.post('/find-penalty-date', jwt_helper.verifyJwtToken, staffController.findPenaltyDate);
router.post('/edit-penalty', jwt_helper.verifyJwtToken, staffController.editPenalty);
router.get('/get-user-details', jwt_helper.verifyJwtToken, userController.getUserDetails);
router.post('/change-password', jwt_helper.verifyJwtToken, userController.resetPassword);
router.get('/wave-penalty:id', jwt_helper.verifyJwtToken, staffController.wavePenalty);
router.get('/delete-penalty:id', jwt_helper.verifyJwtToken,staffController.deletePenalty);
router.post('/search-penalty', jwt_helper.verifyJwtToken,staffController.searchPenalty);
router.post('/search-adv-salary', jwt_helper.verifyJwtToken,staffController.searchSalaryAdv);
router.post('/settle-salary', jwt_helper.verifyJwtToken, staffController.settleSalary);
router.get('/not-paid:id', jwt_helper.verifyJwtToken, staffController.notPaid);

 function checkValidity(req, res, next){
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