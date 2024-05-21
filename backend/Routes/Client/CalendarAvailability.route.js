const express = require('express');
const router = express.Router();

const CalendarAvailabilityController = require('../../Controllers/Client/CalendarAvailability.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/book', [verifyClientToken], CalendarAvailabilityController.createNewCalendarAvailabilityBook);
router.get('/', CalendarAvailabilityController.getAllCalendarAvailabilitys);
router.get('/all', CalendarAvailabilityController.getCalendarAvailabilitys);
router.get('/:id', CalendarAvailabilityController.findCalendarAvailabilityById);
router.get('/advisor/:id', CalendarAvailabilityController.findCalendarAvailabilityByAdvisor);
router.get('/by-date/:date', CalendarAvailabilityController.findCalendarAvailabilityByDate);
router.put('/:id', CalendarAvailabilityController.updateCalendarAvailability);
router.delete('/:id', CalendarAvailabilityController.deleteCalendarAvailability);

module.exports = router;