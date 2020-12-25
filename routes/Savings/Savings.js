const express = require('express');
const router = express.Router()

const savingsCtrl = require('../../controllers/Savings');


router.post("/paystack/pay/add/savings",savingsCtrl.payment)
router.post("/add/savings/:id",savingsCtrl.addTosavings)


module.exports=router