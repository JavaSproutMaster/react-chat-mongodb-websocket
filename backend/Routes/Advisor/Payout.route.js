const express = require('express');
const router = express.Router();

const PayoutController = require('../../Controllers/Advisor/Payout.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

// router.post('/', [verifyAdvisorToken], PaymentController.createNewPayment);
router.get('/', [verifyAdvisorToken], PayoutController.getAllPayouts);
// router.get('/:id', PaymentController.findPaymentById);
// router.put('/:id', PaymentController.updatePayment);
// router.delete('/:id', PaymentController.deletePayment);


module.exports = router;