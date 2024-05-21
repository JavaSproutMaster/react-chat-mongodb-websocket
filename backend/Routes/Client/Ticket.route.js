const express = require('express');
const router = express.Router();

const TicketController = require('../../Controllers/Client/Ticket.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/', [verifyClientToken], TicketController.createNewTicket);

module.exports = router;