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

const AdvisorController = require('../../Controllers/Advisor/Advisor.Controller');
const ClientController = require('../../Controllers/Advisor/Client.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/stripe/connect', [verifyAdvisorToken], AdvisorController.stripeConnect);
router.post('/save-stripe-connect', AdvisorController.saveStripeConnect);
router.get('/advisors', [verifyAdvisorToken], AdvisorController.getAllAdvisors);
router.get('/reviews', [verifyAdvisorToken], AdvisorController.getAllReviews);
router.get('/advisors/:id', AdvisorController.findAdvisorById);
router.put('/advisors/:id', AdvisorController.updateAdvisor);
router.delete('/advisors/:id', AdvisorController.deleteAdvisor);


router.get('/clients', [verifyAdvisorToken], ClientController.getAllClients);
router.get('/clients/:id', ClientController.findClientById);
router.put('/clients/:id', ClientController.updateClient);
router.delete('/clients/:id', ClientController.deleteClient);

module.exports = router;