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

const AdminController = require('../../Controllers/Admin/Admin.Controller');

const { verifyUserToken } = require("../../Middleware/auth");


router.get('/dashboard', [verifyUserToken], AdminController.getDashboardData);


router.get('/admins', [verifyUserToken], AdminController.getAllAdmins);
router.get('/admins/:id', AdminController.findAdminById);
router.put('/admins/:id', AdminController.updateAdmin);
router.delete('/admins/:id', AdminController.deleteAdmin);


router.get('/clients', [verifyUserToken], AdminController.getAllClients);
router.get('/clients/all', AdminController.getClients);
router.get('/clients/:id', AdminController.findClientById);
router.put('/clients/:id', [verifyUserToken], AdminController.updateClient);
router.post('/clients/:id/send-credit-link', AdminController.sendCreditLink);
router.post('/send-credit-link', AdminController.sendCreditLinkEmail);
router.post('/clients/:id/send-chat-link', AdminController.sendChatLink);
router.get('/confirm-credit-link/:id', AdminController.confirmCreditLink);
router.get('/redirect-to-chat/:id', AdminController.redirectToChat);
router.delete('/clients/:id', AdminController.deleteClient);
router.post('/clients/activate-deactivate/:id', AdminController.ActivateDeactivateClient);

router.post('/users', [verifyUserToken], AdminController.createNewUser);
router.get('/users', [verifyUserToken], AdminController.getAllUsers);
router.get('/users/:id', AdminController.findUserById);
router.put('/users/:id', [verifyUserToken], AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

router.get('/advisors', [verifyUserToken], AdminController.getAllAdvisors);
router.get('/advisors/all', AdminController.getAdvisors);
router.get('/advisors/list', AdminController.getAdvisorsList);
router.post('/advisors', [verifyUserToken], AdminController.createNewAdvisor);
router.get('/advisors/:id', AdminController.findAdvisorById);
router.put('/advisors/:id', [verifyUserToken], AdminController.updateAdvisor);
router.delete('/advisors/:id', AdminController.deleteAdvisor);
router.put('/advisors/approve/:id', AdminController.approveAdvisor);
router.put('/advisors/update-commission/:id', AdminController.updateAdvisorCommission);
router.put('/advisors/activate-deactivate/:id', AdminController.ActivateDeactivateAdvisor);

module.exports = router;