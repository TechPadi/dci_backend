const express = require('express');
const router = express.Router();

const investmentCtrl = require('../../controllers/investment');



router.post("/create/plan",investmentCtrl.plan)
router.get("/plans",investmentCtrl.plans)
router.post("/plans/:id/subplans",investmentCtrl.subplans)
router.get("/plans/:id/singleplan",investmentCtrl.singlePlan)
router.post("/plans/:id/subsingleplan",investmentCtrl.CreatesingleSubPlan)
router.get("/plans/:id/subsingleplan",investmentCtrl.getsingleSubPlan)
router.put("/plans/:id/pickedplan",investmentCtrl.pickedplan)
router.put("/plansdelete/:id/terminate",investmentCtrl.terminate)
router.post("/payment/paystack",investmentCtrl.payment)
module.exports = router;