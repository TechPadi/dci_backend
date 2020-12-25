const express = require('express');
const router = express.Router();

const loanCtrl = require('../../controllers/Loan');


router.post("/request/loan/details/:id",loanCtrl.loandets)
router.post("/request/loan/docs/:id",loanCtrl.loandocs)
router.post("/request/loan/dciinvestor/:id",loanCtrl.loandciinvestor)
router.post("/activate/loan/:id",loanCtrl.loanactivate)
router.post("/paynowloan/loan/:id",loanCtrl.paynowloan)
module.exports = router;