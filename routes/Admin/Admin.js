const express = require('express');
const router = express.Router();
const adminCtrl = require('../../controllers/Admin');


router.post("/register",adminCtrl.signup)
router.post("/login",adminCtrl.login)
router.post("/dashboard/:id",adminCtrl.AdminDashboard)
router.get("/all/admin",adminCtrl.AllAdmins)
router.get("/user/request/investment",adminCtrl.Pending)
router.post("/user/verifyinvestor/investment/:id",adminCtrl.verifyinvestor)
router.get("/user/request/loans",adminCtrl.PendingLoaner)
router.post("/user/verifyLoaner/investment/:id",adminCtrl.verifyloaner)
router.get("/user/request/savingsadd",adminCtrl.PendingSaveAdd)
router.post("/user/verifysavings/investment/:id",adminCtrl.verifysavings)
router.get("/user/requestpayloan/payloanrequest",adminCtrl.PayLoan)
router.post("/user/verifypayloan/loaner/:id",adminCtrl.verifypayloan)
router.get("/user/requestaddtosti/paysaveadd",adminCtrl.stirequest)
router.post("/user/verifyaddtosti/save/:id",adminCtrl.verifysti)


router.get("/usersthatsaves/savings/activeusers",adminCtrl.savingsIsActive)

module.exports = router;