const express = require('express');
const router = express.Router();

const AdvisorNotesController = require('../../Controllers/Advisor/AdvisorNotes.Controller');

router.post('/', AdvisorNotesController.createNewAdvisorNotes);
router.get('/', AdvisorNotesController.getAdvisorNotes);

module.exports = router;