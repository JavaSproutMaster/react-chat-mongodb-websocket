const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/advisor/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const AuthController = require('../../Controllers/Advisor/Auth.Controller');

const PasswordReset = require('../../Controllers/Advisor/PasswordReset.Controller');

router.post("/password-reset", PasswordReset.resetPasswordEmail);

router.post("/password-reset/:userId/:token", PasswordReset.resetPassword);

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.get('/info', [verifyAdvisorToken], AuthController.verifyAToken);

router.get('/users', [verifyAdvisorToken], AuthController.getAllAdmins);

router.get('/profile', [verifyAdvisorToken], AuthController.profile);

//Create a new user admin
router.post('/login', AuthController.adminLogin);

router.get('/logout', [verifyAdvisorToken], AuthController.adminLogout);

router.post('/register', uploads.single('avatar'), AuthController.adminRegister);

router.get('/confirm-email/:confirmationCode', AuthController.confirmEmail);

router.post('/validate-email', AuthController.emailValidate);

router.post('/verify-email', AuthController.verifyEmail);

router.post('/validate', AuthController.userValidate);

router.post('/google-login', AuthController.googleRegisterLogin);

router.post('/update-password', [verifyAdvisorToken], AuthController.resetPassword);

//Get a user admin by id
router.get('/:id', AuthController.findAuthById);

router.get('/getnotification/:id', [verifyAdvisorToken], AuthController.getnotificationById);

router.post('/allclients', AuthController.getClientslist);


//Update a user admin by id
router.patch('/profile/:id', [verifyAdvisorToken], uploads.any(), AuthController.updateAAuth);

router.put('/update-chat-status', [verifyAdvisorToken], AuthController.updateChatStatus);

router.put('/update-chat-engage-status', [verifyAdvisorToken], AuthController.updateChatEngageStatus);

router.put('/update-chat-engage-status-client', AuthController.updateChatEngageStatusClient);

//Delete a user admin by id
router.delete('/:id', AuthController.deleteAAuth);

module.exports = router;