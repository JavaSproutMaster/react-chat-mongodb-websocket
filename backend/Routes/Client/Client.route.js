const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var uploads = multer({ storage: storage });
const ClientController = require('../../Controllers/Client/Client.Controller');
const AdvisorController = require('../../Controllers/Client/Advisor.Controller');
const { verifyClientToken } = require("../../Middleware/auth");

router.get('/clients', [verifyClientToken], ClientController.getAllClients);
router.get('/clients/:id', ClientController.findClientById);
router.put('/clients/:id', ClientController.updateClient);
router.delete('/clients/:id', ClientController.deleteClient);

router.get('/booking-notifications', [verifyClientToken], ClientController.getAllBookingNotifications);

router.get('/advisors', [verifyClientToken], AdvisorController.getAllAdvisors);
router.get('/advisors/:id', AdvisorController.findAdvisorById);
router.put('/advisors/:id', AdvisorController.updateAdvisor);
router.delete('/advisors/:id', AdvisorController.deleteAdvisor);

router.put('/update-chat-engage-status', ClientController.updateChatEngage_Status);
router.get('/advisors-online', ClientController.getAllOnlineAdvisors);

router.put('/update-chat-status', ClientController.updateChat_Status);
router.get('/chat-online-status/:id', ClientController.getStatusChatca);

module.exports = router;