const express = require('express');
const router = express.Router();

const TicketController = require('../../Controllers/Admin/Ticket.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', TicketController.createNewTicket);
router.get('/', TicketController.getAllTickets);
router.get('/all', TicketController.getTickets);
router.get('/:id', TicketController.findTicketById);
router.put('/:id', [verifyUserToken], TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;