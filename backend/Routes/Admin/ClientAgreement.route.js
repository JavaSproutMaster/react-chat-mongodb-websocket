const express = require('express');
const router = express.Router();

const ClientAgreementController = require('../../Controllers/Admin/ClientAgreement.Controller');

router.get('/', ClientAgreementController.getClientAgreement);
router.put('/:id', ClientAgreementController.updateClientAgreement);

module.exports = router;