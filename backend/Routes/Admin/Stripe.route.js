const express = require('express');
const router = express.Router();
//const PaymentController = require('../../Controllers/Admin/Stripe.controller');

const { verifyClientToken } = require("../../Middleware/auth");


// router.get('/transactions', PaymentController.transactions);
// router.get('/payouts', PaymentController.payouts);
// router.get('/payment-intents', PaymentController.paymentIntents);

module.exports = router;