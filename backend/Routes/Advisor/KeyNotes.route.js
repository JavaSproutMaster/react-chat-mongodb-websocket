const express = require('express');
const router = express.Router();

const KeyNotesController = require('../../Controllers/Advisor/KeyNotes.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], KeyNotesController.createNewKeyNotes);
router.get('/', KeyNotesController.getKeyNotes);
router.get('/:id', [verifyAdvisorToken], KeyNotesController.getKeyNotes);
router.delete('/:id', KeyNotesController.deleteKeyNotes);

module.exports = router;