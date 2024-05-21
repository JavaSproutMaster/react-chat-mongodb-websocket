const express = require('express');
const router = express.Router();

const FAQController = require('../../Controllers/Admin/FAQ.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], FAQController.createNewFAQ);
router.get('/', FAQController.getAllFAQs);
router.get('/all', FAQController.getFAQs);
router.get('/:id', FAQController.findFAQById);
router.put('/:id', FAQController.updateFAQ);
router.delete('/:id', FAQController.deleteFAQ);

module.exports = router;