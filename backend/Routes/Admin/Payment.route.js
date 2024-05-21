const express = require('express');
const router = express.Router();

const PaymentController = require('../../Controllers/Admin/Payment.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], PaymentController.createNewPayment);
router.get('/', [verifyUserToken], PaymentController.getAllPayments);
router.get('/payouts', [verifyUserToken], PaymentController.getAllPayouts);
router.get('/:id', PaymentController.findPaymentById);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

module.exports = router;