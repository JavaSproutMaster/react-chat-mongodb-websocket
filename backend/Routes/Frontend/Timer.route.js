const express = require('express');
const router = express.Router();

const TimerController = require('../../Controllers/Frontend/Timer.Controller');

router.post('/', TimerController.createNewTimer);
router.get('/', TimerController.getAllTimers);
router.get('/all', TimerController.getTimers);
router.get('/:client_id/:advisor_id', TimerController.findTimerById);
router.put('/:client_id/:advisor_id', TimerController.updateTimer);
router.delete('/:client_id/:advisor_id', TimerController.deleteTimer);

module.exports = router;