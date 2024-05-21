const express = require('express');
const router = express.Router();

const TicketController = require('../../Controllers/Frontend/Ticket.Controller');

router.post('/', TicketController.createNewTicket);;

module.exports = router;