const express = require('express');
const router = express.Router();

const PrivacyPolicyController = require('../../Controllers/Admin/PrivacyPolicy.Controller');

router.get('/', PrivacyPolicyController.getPrivacyPolicy);
router.put('/:id', PrivacyPolicyController.updatePrivacyPolicy);

module.exports = router;