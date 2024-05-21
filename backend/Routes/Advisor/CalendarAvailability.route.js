const express = require('express');
const router = express.Router();

const CalendarAvailabilityController = require('../../Controllers/Advisor/CalendarAvailability.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], CalendarAvailabilityController.createNewCalendarAvailability);
router.get('/', [verifyAdvisorToken], CalendarAvailabilityController.getAllCalendarAvailabilitys);
router.get('/booked', [verifyAdvisorToken], CalendarAvailabilityController.getCalendarAvailabilityBooked);
router.get('/all', CalendarAvailabilityController.getCalendarAvailabilitys);
router.get('/:id', CalendarAvailabilityController.findCalendarAvailabilityById);
router.put('/:id', CalendarAvailabilityController.updateCalendarAvailability);
router.delete('/:id', CalendarAvailabilityController.deleteCalendarAvailability);

module.exports = router;