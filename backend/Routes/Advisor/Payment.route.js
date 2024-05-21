const express = require('express');
const router = express.Router();

const PaymentController = require('../../Controllers/Advisor/Payment.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], PaymentController.createNewPayment);
router.get('/', [verifyAdvisorToken], PaymentController.getAllPayments);
router.get('/:id', PaymentController.findPaymentById);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);


module.exports = router;