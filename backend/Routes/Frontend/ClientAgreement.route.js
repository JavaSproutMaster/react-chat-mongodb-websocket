const express = require('express');
const router = express.Router();

const ClientAgreementController = require('../../Controllers/Frontend/ClientAgreement.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.get('/', ClientAgreementController.getClientAgreement);

module.exports = router;