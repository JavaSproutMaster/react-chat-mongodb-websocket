const express = require('express');
const router = express.Router();

const TicketController = require('../../Controllers/Advisor/Ticket.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], TicketController.createNewTicket);;

module.exports = router;