const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller');
const userController = require('../controllers/user_controller');
const OutletController = require('../controllers/outlet-controller');
const staffController =  require('../controllers/staff_controller');
const distController = require('../controllers/distribute-control');
const fruitController = require('../controllers/fruit_controller');
const merchantController = require('../controllers/merchant_controller');

const jwt_helper = require('../config/jwt_helper');
const mongoose  = require('mongoose');
const UserModel = mongoose.model('User');
const fetch = require("node-fetch");

// router.post('/register' , userController.register);
router.post('/login', userController.login);
router.post('/create-user', userController.createUser);

router.get('/disable-user:id', jwt_helper.verifyJwtToken,checkValidity, userController.disableUser);
router.get('/activate-user:id', jwt_helper.verifyJwtToken,checkValidity, userController.activateUser);
router.post('/search-username', jwt_helper.verifyJwtToken,checkValidity, userController.searchUser);
router.get('/delete-user:id', jwt_helper.verifyJwtToken,checkValidity, userController.deleteUser);
router.get('/delete-outlet:id', jwt_helper.verifyJwtToken,checkValidity,OutletController.deleteOutlet);
router.post('/update-merchant-rate', jwt_helper.verifyJwtToken,checkValidity,OutletController.updateMerchantRate);
router.get('/get-all-users', jwt_helper.verifyJwtToken,checkValidity, userController.getAllUsers);
router.post('/create-outlet', jwt_helper.verifyJwtToken,checkValidity,OutletController.createOutlet);
router.get('/get-all-oulets', jwt_helper.verifyJwtToken,checkValidity,OutletController.getAll);
router.post('/search-outlet', jwt_helper.verifyJwtToken,checkValidity,OutletController.searcOutlet);
router.post('/edit-outlet', jwt_helper.verifyJwtToken,checkValidity, OutletController.editOutlet);
router.post('/update-balance', jwt_helper.verifyJwtToken,checkValidity, userController.updateBalance);
router.get('/last-credit', jwt_helper.verifyJwtToken,checkValidity, userController.lastCredit);
router.post('/submit-expense', jwt_helper.verifyJwtToken,checkValidity, userController.expenseList);
router.post('/return-expense', jwt_helper.verifyJwtToken,checkValidity, userController.returnExpense);
router.post('/this-month-expense', jwt_helper.verifyJwtToken,checkValidity, userController.thisMonthExpense);
router.get('/get-expenses', jwt_helper.verifyJwtToken,checkValidity, userController.getExpense);
router.get('/confirm-expense:id', jwt_helper.verifyJwtToken,checkValidity, userController.confirmExpense);
router.get('/un-confirm-expense:id', jwt_helper.verifyJwtToken,checkValidity, userController.unConfirmExpense);

router.get('/get-credit', jwt_helper.verifyJwtToken,checkValidity, userController.getCredit);
router.get('/get-balance', jwt_helper.verifyJwtToken,checkValidity, userController.getBalance);
router.get('/verify-expense:id', jwt_helper.verifyJwtToken,checkValidity,  userController.verifyExpense);
router.post('/find-by-date', jwt_helper.verifyJwtToken,checkValidity, userController.findExpensebyDate);
router.get('/select-expense:cat', jwt_helper.verifyJwtToken,checkValidity, userController.selectExpenseByCat);
router.post('/reverse-expense', jwt_helper.verifyJwtToken,checkValidity, userController.reverseExpense);
router.get('/delete-credit:id', jwt_helper.verifyJwtToken,checkValidity, userController.deleteCredit);
router.post('/search-expense', jwt_helper.verifyJwtToken,checkValidity,userController.searcExpense);
router.post('/submit-staff', jwt_helper.verifyJwtToken,checkValidity,staffController.submitStaff);
router.get('/get-all-staff', jwt_helper.verifyJwtToken,checkValidity,staffController.getAllStaff);
router.get('/select-staff-depart:cat',jwt_helper.verifyJwtToken,checkValidity, staffController.getStaffByCategory);
router.get('/delete-staff:id', jwt_helper.verifyJwtToken,checkValidity,staffController.deleteStaff);
router.post('/penalize-staff', jwt_helper.verifyJwtToken,checkValidity, staffController.penalizeStaff);
router.post('/salary-advance', jwt_helper.verifyJwtToken,checkValidity, staffController.salaryAdvance);
router.get('/get-salary-adv', jwt_helper.verifyJwtToken,checkValidity,staffController.getSalaryAdv);
router.get('/get-all-penalty', jwt_helper.verifyJwtToken,checkValidity, staffController.getAllPenalize);
router.post('/submit-prod', jwt_helper.verifyJwtToken,checkValidity,distController.submitProd);
router.get('/get-production',jwt_helper.verifyJwtToken,checkValidity, distController.getProduction);
router.post('/submit-bad-stock', jwt_helper.verifyJwtToken,checkValidity,distController.sumbitBadStock)
router.get('/find-outlet:id', jwt_helper.verifyJwtToken,checkValidity,OutletController.findOutletbyId);
router.post('/supply-outlet', jwt_helper.verifyJwtToken,checkValidity,distController.supplyOutlet);
router.get('/close-record:id', jwt_helper.verifyJwtToken,checkValidity,distController.closeRecord);
router.get('/get-all-staff', jwt_helper.verifyJwtToken,checkValidity,staffController.getAllStaff);
router.post('/find-salary-advbydate', jwt_helper.verifyJwtToken,checkValidity, staffController.FindSalaryAdvByDate);
router.post('/delete-salary-advance', jwt_helper.verifyJwtToken,checkValidity, staffController.deleteSalaryAdvance);
router.post('/find-penalty-date', jwt_helper.verifyJwtToken,checkValidity, staffController.findPenaltyDate);
router.post('/this-month-penalty', jwt_helper.verifyJwtToken,checkValidity, staffController.thisMonthPenalty);
router.post('/edit-penalty', jwt_helper.verifyJwtToken,checkValidity, staffController.editPenalty);
router.get('/get-user-details', jwt_helper.verifyJwtToken,checkValidity, userController.getUserDetails);
router.post('/change-password', jwt_helper.verifyJwtToken,checkValidity, userController.resetPassword);
router.get('/wave-penalty:id', jwt_helper.verifyJwtToken,checkValidity, staffController.wavePenalty);
router.get('/delete-penalty:id', jwt_helper.verifyJwtToken,checkValidity,staffController.deletePenalty);
router.post('/search-penalty', jwt_helper.verifyJwtToken,checkValidity,staffController.searchPenalty);
router.post('/search-adv-salary', jwt_helper.verifyJwtToken,checkValidity,staffController.searchSalaryAdv);
router.post('/settle-salary', jwt_helper.verifyJwtToken,checkValidity, staffController.settleSalary);
router.get('/not-paid:id', jwt_helper.verifyJwtToken,checkValidity, staffController.notPaid);
router.get('/get-all-payout', jwt_helper.verifyJwtToken,checkValidity, staffController.getAllPayout);
router.post('/search-staff-name', jwt_helper.verifyJwtToken,checkValidity, staffController.searchStaff);
router.post('/submit-fruit', jwt_helper.verifyJwtToken,checkValidity,fruitController.registerFruit );
router.post('/this-month-fruit', jwt_helper.verifyJwtToken,checkValidity,fruitController.thisMonthFruit );
router.get('/get-fruit-record', jwt_helper.verifyJwtToken,checkValidity,fruitController.getFruitRecord );
router.get('/set-payment-false:id', jwt_helper.verifyJwtToken,checkValidity, staffController.setPaymentFalse);
router.get('/set-payment-true:id', jwt_helper.verifyJwtToken,checkValidity, staffController.setPaymentTrue);
router.get('/select-payout-depart:cat', jwt_helper.verifyJwtToken,checkValidity, staffController.payOutByDepartment);
router.get('/verify-fruit:id', jwt_helper.verifyJwtToken,checkValidity, fruitController.verifyFruit);
router.get('/ok-fruit-record:id', jwt_helper.verifyJwtToken,checkValidity, fruitController.okFruitRecord);
router.get('/un-ok-fruit-record:id', jwt_helper.verifyJwtToken,checkValidity, fruitController.UnokFruitRecord);
router.get('/disprove-fruit-record:id', jwt_helper.verifyJwtToken,checkValidity, fruitController.disproveFruit);
router.post('/find-fruit-by-date', jwt_helper.verifyJwtToken,checkValidity, fruitController.findFruitbyDate);
router.post('/edit-fruit-sm', jwt_helper.verifyJwtToken,checkValidity, fruitController.editfruitSubmit);
router.post('/get-some-data', jwt_helper.verifyJwtToken,checkValidity, merchantController.findSalesByDate);
router.get('/get-all-merchant', jwt_helper.verifyJwtToken,checkValidity, OutletController.getAllMerchant);
router.post('/submit-merchant-sales', jwt_helper.verifyJwtToken,checkValidity,merchantController.submitRecord);
router.get('/get-sales-record', jwt_helper.verifyJwtToken,checkValidity,merchantController.getSalesRecord);
router.get('/ok-sales-record:id', jwt_helper.verifyJwtToken,checkValidity,merchantController.okSaleRecord);
router.get('/delete-sales-record:id', jwt_helper.verifyJwtToken,checkValidity,merchantController.deleteSales);
router.get('/verify-sales-record:id', jwt_helper.verifyJwtToken,checkValidity,merchantController.verifySaleRecord);
router.get('/disprove-sales-record:id', jwt_helper.verifyJwtToken,checkValidity,merchantController.disproveSale);
router.post('/get-merchant-record', jwt_helper.verifyJwtToken,checkValidity,merchantController.getMerchantRecord);
router.post('/merchant-date-bymonth' , jwt_helper.verifyJwtToken,checkValidity, merchantController.getByMonth);
router.post('/merchant-date-day', jwt_helper.verifyJwtToken, merchantController.getByDay);
router.post('/find-outlet-sales', jwt_helper.verifyJwtToken,checkValidity,merchantController.outletSales);
router.get('/get-limit-staff', jwt_helper.verifyJwtToken,checkValidity, staffController.getLimitStaff);
router.post('/this-month-advs', jwt_helper.verifyJwtToken,checkValidity, staffController.thisMonthAdvs);
router.put('/update-expense', jwt_helper.verifyJwtToken,checkValidity,userController.updateExpense);
router.post('/update-expense-two', jwt_helper.verifyJwtToken,checkValidity,userController.updateExpenseTwo);
router.get('/reset-payroll', jwt_helper.verifyJwtToken,checkValidity, staffController.resetPayRoll);
router.post('/get-pay-record', jwt_helper.verifyJwtToken,checkValidity, staffController.getPayRecord);
router.post('/record-department', jwt_helper.verifyJwtToken,checkValidity, staffController.recordDepartment);
router.post('/submit-returns',jwt_helper.verifyJwtToken,checkValidity, distController.submitReturns);
router.get('/confirm-prod:id', jwt_helper.verifyJwtToken,checkValidity,distController.confirmProd);
router.get('/un-confirm-prod:id', jwt_helper.verifyJwtToken,checkValidity,distController.UnConfirmProd);
router.post('/get-outlet-supplies', jwt_helper.verifyJwtToken,checkValidity,distController.outletSupplies);
router.post('/production-list', jwt_helper.verifyJwtToken,checkValidity,distController.productionList);
router.post('/prod-by-date', jwt_helper.verifyJwtToken,checkValidity,distController.prodByDate);
router.get('/verify-penalty:id', jwt_helper.verifyJwtToken,checkValidity,staffController.verifyPenalty);
router.get('/un-verify-penalty:id', jwt_helper.verifyJwtToken,checkValidity,staffController.unverifyPenalty);
router.get('/confirm-penalty:id', jwt_helper.verifyJwtToken,checkValidity,staffController.confirmPenalty);
router.get('/un-confirm-penalty:id', jwt_helper.verifyJwtToken,checkValidity,staffController.unConfirmPenalty);
router.post('/submit-expense-two', jwt_helper.verifyJwtToken, checkValidity, userController.submitExpense2);
router.post('/get-expense-two', jwt_helper.verifyJwtToken, checkValidity, userController.getExpense2);
router.post('/expense-two-by-date', jwt_helper.verifyJwtToken,checkValidity,userController.expense2byDate)
router.post('/edit-production',jwt_helper.verifyJwtToken,checkValidity,distController.editProduction);
router.post('/edit-bad-stock',jwt_helper.verifyJwtToken,checkValidity,distController.editBadStock);
router.get('/confirm-supply:id', jwt_helper.verifyJwtToken,checkValidity,distController.confirmSupply);
router.get('/un-confirm-supply:id', jwt_helper.verifyJwtToken,checkValidity,distController.unConfirmSupply);
router.get('/verify-supply:id', jwt_helper.verifyJwtToken,checkValidity,distController.verifySupply);
router.get('/un-verify-supply:id', jwt_helper.verifyJwtToken,checkValidity,distController.unVerifySupply);
router.post('/update-supply', jwt_helper.verifyJwtToken,checkValidity,distController.updateSupply);



 function checkValidity(req, res, next){
     const userID = req._id;
     console.log(userID)
     UserModel.findById({_id: userID}, (err, user)=> {
         if(user){

             if(user.active){
                next();
             }else{
                 res.status(422).send({msg:"account is under suspenssion!"});
             }
         }else{
             res.status(412).send({msg:'token expire. please do logout/login'})
         }
     })
    
 }

module.exports = router;