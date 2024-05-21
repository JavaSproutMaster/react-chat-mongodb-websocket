const express = require('express');
const router = express.Router();

const AdvisorAgreementController = require('../../Controllers/Frontend/AdvisorAgreement.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.get('/', AdvisorAgreementController.getAdvisorAgreement);

module.exports = router;