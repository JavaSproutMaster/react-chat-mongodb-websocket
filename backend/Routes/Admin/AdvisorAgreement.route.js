const express = require('express');
const router = express.Router();

const AdvisorAgreementController = require('../../Controllers/Admin/AdvisorAgreement.Controller');

router.get('/', AdvisorAgreementController.getAdvisorAgreement);
router.put('/:id', AdvisorAgreementController.updateAdvisorAgreement);

module.exports = router;