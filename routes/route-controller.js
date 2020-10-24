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

router.get('/disable-user:id', jwt_helper.verifyJwtToken, userController.disableUser);
router.get('/activate-user:id', jwt_helper.verifyJwtToken, userController.activateUser);
router.post('/search-username', jwt_helper.verifyJwtToken, userController.searchUser);
router.get('/delete-user:id', jwt_helper.verifyJwtToken, userController.deleteUser);
router.get('/delete-outlet:id', jwt_helper.verifyJwtToken,OutletController.deleteOutlet);
router.post('/update-merchant-rate', jwt_helper.verifyJwtToken,OutletController.updateMerchantRate);
router.get('/get-all-users', jwt_helper.verifyJwtToken, userController.getAllUsers);
router.post('/create-outlet', jwt_helper.verifyJwtToken,OutletController.createOutlet);
router.get('/get-all-outlets', jwt_helper.verifyJwtToken,OutletController.getAll);
router.post('/search-outlet', jwt_helper.verifyJwtToken,OutletController.searcOutlet);
router.post('/edit-outlet', jwt_helper.verifyJwtToken, OutletController.editOutlet);
router.post('/update-balance', jwt_helper.verifyJwtToken, userController.updateBalance);
router.get('/last-credit', jwt_helper.verifyJwtToken, userController.lastCredit);
router.post('/submit-expense', jwt_helper.verifyJwtToken, userController.expenseList);
router.post('/return-expense', jwt_helper.verifyJwtToken, userController.returnExpense);
router.post('/this-month-expense', jwt_helper.verifyJwtToken, userController.thisMonthExpense);
router.get('/get-expenses', jwt_helper.verifyJwtToken, userController.getExpense);
router.get('/confirm-expense:id', jwt_helper.verifyJwtToken, userController.confirmExpense);
router.get('/un-confirm-expense:id', jwt_helper.verifyJwtToken, userController.unConfirmExpense);

router.put('/get-credit', jwt_helper.verifyJwtToken, userController.getCredit);
router.get('/get-balance', jwt_helper.verifyJwtToken, userController.getBalance);
router.get('/verify-expense:id', jwt_helper.verifyJwtToken,  userController.verifyExpense);
router.post('/find-by-date', jwt_helper.verifyJwtToken, userController.findExpensebyDate);
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
router.post('/submit-prod', jwt_helper.verifyJwtToken,distController.submitProd);
router.get('/get-production',jwt_helper.verifyJwtToken, distController.getProduction);
router.post('/submit-bad-stock', jwt_helper.verifyJwtToken,distController.sumbitBadStock)
router.get('/find-outlet:id', jwt_helper.verifyJwtToken,OutletController.findOutletbyId);
router.post('/supply-outlet', jwt_helper.verifyJwtToken,distController.supplyOutlet);
router.get('/close-record:id', jwt_helper.verifyJwtToken,distController.closeRecord);
router.get('/get-all-staff', jwt_helper.verifyJwtToken,staffController.getAllStaff);
router.post('/find-salary-advbydate', jwt_helper.verifyJwtToken, staffController.FindSalaryAdvByDate);
router.post('/delete-salary-advance', jwt_helper.verifyJwtToken, staffController.deleteSalaryAdvance);
router.post('/find-penalty-date', jwt_helper.verifyJwtToken, staffController.findPenaltyDate);
router.post('/this-month-penalty', jwt_helper.verifyJwtToken, staffController.thisMonthPenalty);
router.post('/edit-penalty', jwt_helper.verifyJwtToken, staffController.editPenalty);
router.get('/get-user-details', jwt_helper.verifyJwtToken, userController.getUserDetails);
router.post('/change-password', jwt_helper.verifyJwtToken, userController.resetPassword);
router.get('/wave-penalty:id', jwt_helper.verifyJwtToken, staffController.wavePenalty);
router.get('/delete-penalty:id', jwt_helper.verifyJwtToken,staffController.deletePenalty);
router.post('/search-penalty', jwt_helper.verifyJwtToken,staffController.searchPenalty);
router.post('/search-adv-salary', jwt_helper.verifyJwtToken,staffController.searchSalaryAdv);
router.post('/settle-salary', jwt_helper.verifyJwtToken, staffController.settleSalary);
router.get('/not-paid:id', jwt_helper.verifyJwtToken, staffController.notPaid);
router.get('/get-all-payout', jwt_helper.verifyJwtToken, staffController.getAllPayout);
router.post('/search-staff-name', jwt_helper.verifyJwtToken, staffController.searchStaff);
router.post('/submit-fruit', jwt_helper.verifyJwtToken,fruitController.registerFruit );
router.post('/this-month-fruit', jwt_helper.verifyJwtToken,fruitController.thisMonthFruit );
router.get('/get-fruit-record', jwt_helper.verifyJwtToken,fruitController.getFruitRecord );
router.get('/set-payment-false:id', jwt_helper.verifyJwtToken, staffController.setPaymentFalse);
router.get('/set-payment-true:id', jwt_helper.verifyJwtToken, staffController.setPaymentTrue);
router.get('/select-payout-depart:cat', jwt_helper.verifyJwtToken, staffController.payOutByDepartment);
router.get('/verify-fruit:id', jwt_helper.verifyJwtToken, fruitController.verifyFruit);
router.get('/ok-fruit-record:id', jwt_helper.verifyJwtToken, fruitController.okFruitRecord);
router.get('/un-ok-fruit-record:id', jwt_helper.verifyJwtToken, fruitController.UnokFruitRecord);
router.get('/disprove-fruit-record:id', jwt_helper.verifyJwtToken, fruitController.disproveFruit);
router.post('/find-fruit-by-date', jwt_helper.verifyJwtToken, fruitController.findFruitbyDate);
router.post('/edit-fruit-sm', jwt_helper.verifyJwtToken, fruitController.editfruitSubmit);
router.post('/merchant-sales', jwt_helper.verifyJwtToken, merchantController.monthlySales);
router.get('/get-all-merchant', jwt_helper.verifyJwtToken, OutletController.getAllMerchant);
router.post('/submit-merchant-sales', jwt_helper.verifyJwtToken,merchantController.submitRecord);
// router.get('/get-sales-record', jwt_helper.verifyJwtToken,merchantController.getSalesRecord);
router.get('/ok-sales-record:id', jwt_helper.verifyJwtToken,merchantController.okSaleRecord);
router.get('/delete-sales-record:id', jwt_helper.verifyJwtToken,merchantController.deleteSales);
router.get('/verify-sales-record:id', jwt_helper.verifyJwtToken,merchantController.verifySaleRecord);
router.get('/disprove-sales-record:id', jwt_helper.verifyJwtToken,merchantController.disproveSale);
router.post('/get-merchant-record', jwt_helper.verifyJwtToken,merchantController.getMerchantRecord);
router.post('/merchant-date-bymonth' , jwt_helper.verifyJwtToken, merchantController.monthlyMercahntRecord);
router.post('/merchant-date-day', jwt_helper.verifyJwtToken, merchantController.dailySales);
router.post('/find-outlet-sales', jwt_helper.verifyJwtToken,merchantController.outletSales);
router.get('/get-limit-staff', jwt_helper.verifyJwtToken, staffController.getLimitStaff);
router.post('/this-month-advs', jwt_helper.verifyJwtToken, staffController.thisMonthAdvs);
router.put('/update-expense', jwt_helper.verifyJwtToken,userController.updateExpense);
router.put('/update-return', jwt_helper.verifyJwtToken,userController.updateReturn);
router.post('/update-expense-two', jwt_helper.verifyJwtToken,userController.updateExpenseTwo);
router.get('/reset-payroll', jwt_helper.verifyJwtToken, staffController.resetPayRoll);
router.post('/get-pay-record', jwt_helper.verifyJwtToken, staffController.getPayRecord);
router.post('/record-department', jwt_helper.verifyJwtToken, staffController.recordDepartment);
router.post('/submit-returns',jwt_helper.verifyJwtToken, distController.submitReturns);
router.get('/confirm-prod:id', jwt_helper.verifyJwtToken,distController.confirmProd);
router.get('/un-confirm-prod:id', jwt_helper.verifyJwtToken,distController.UnConfirmProd);
router.post('/get-outlet-supplies', jwt_helper.verifyJwtToken,distController.outletSupplies);
router.post('/get-outlet-supplies-daily', jwt_helper.verifyJwtToken,distController.outletSuppliesdaily);
router.post('/production-list', jwt_helper.verifyJwtToken,distController.productionList);
router.post('/prod-by-date', jwt_helper.verifyJwtToken,distController.prodByDate);
router.get('/verify-penalty:id', jwt_helper.verifyJwtToken,staffController.verifyPenalty);
router.get('/un-verify-penalty:id', jwt_helper.verifyJwtToken,staffController.unverifyPenalty);
router.get('/confirm-penalty:id', jwt_helper.verifyJwtToken,staffController.confirmPenalty);
router.get('/un-confirm-penalty:id', jwt_helper.verifyJwtToken,staffController.unConfirmPenalty);
router.post('/submit-expense-two', jwt_helper.verifyJwtToken, userController.submitExpense2);
router.post('/get-expense-two', jwt_helper.verifyJwtToken, userController.getExpense2);
router.post('/expense-two-by-date', jwt_helper.verifyJwtToken,userController.expense2byDate)
router.post('/edit-production',jwt_helper.verifyJwtToken,distController.editProduction);
router.post('/edit-bad-stock',jwt_helper.verifyJwtToken,distController.editBadStock);
router.get('/confirm-supply:id', jwt_helper.verifyJwtToken,distController.confirmSupply);
router.get('/un-confirm-supply:id', jwt_helper.verifyJwtToken,distController.unConfirmSupply);
router.get('/verify-supply:id', jwt_helper.verifyJwtToken,distController.verifySupply);
router.get('/un-verify-supply:id', jwt_helper.verifyJwtToken,distController.unVerifySupply);
router.post('/update-supply', jwt_helper.verifyJwtToken,distController.updateSupply);
router.put('/update-stafe', jwt_helper.verifyJwtToken, staffController.updateStaff);
router.put('/change-staff-status', jwt_helper.verifyJwtToken, staffController.changeStatus);
router.get('/removed-staffed', jwt_helper.verifyJwtToken, staffController.removedStaff);




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