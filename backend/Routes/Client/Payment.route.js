const express = require('express');
const router = express.Router();

const PaymentController = require('../../Controllers/Client/Payment.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/', [verifyClientToken], PaymentController.createNewPayment);
router.get('/earnings', [verifyClientToken], PaymentController.getAllEarnings);
router.get('/', [verifyClientToken], PaymentController.getAllPayments);
router.get('/:id', PaymentController.findPaymentById);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);


module.exports = router;