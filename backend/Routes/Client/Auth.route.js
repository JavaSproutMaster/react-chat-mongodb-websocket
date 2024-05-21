const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/client/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const AuthController = require('../../Controllers/Client/Auth.Controller');

const PasswordReset = require('../../Controllers/Client/PasswordReset.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.get('/confirm-email/:confirmationCode', AuthController.confirmEmail);

router.get('/info', [verifyClientToken], AuthController.verifyAToken);


router.get('/users', [verifyClientToken], AuthController.getAllAdmins);

router.get('/profile', [verifyClientToken], AuthController.profile);

router.get('/newprofile/:id', [verifyClientToken], AuthController.newprofile);

router.post("/password-reset", PasswordReset.resetPasswordEmail);

router.post("/password-reset/:userId/:token", PasswordReset.resetPassword);

//Create a new user admin
router.post('/login', AuthController.adminLogin);

router.post('/google-login', AuthController.googleRegisterLogin);

router.post('/send-email-mailchimp', AuthController.sendEmailMailchimp);

router.get('/logout', [verifyClientToken], AuthController.adminLogout);

router.post('/register', AuthController.adminRegister);

router.post('/wallet', [verifyClientToken], AuthController.AddWalletBalance);

router.post('/payment/method/attach', [verifyClientToken], AuthController.paymentMethodAttach);

router.post('/payment/create', [verifyClientToken], AuthController.paymentCreate);

router.post('/verify-token', AuthController.verifyToken);

router.post('/payment/create-chat', [verifyClientToken], AuthController.paymentCreateChat);

router.post('/payment/confirm', [verifyClientToken], AuthController.paymentConfirm);

router.post('/payment/save', [verifyClientToken], AuthController.paymentSave);

router.post('/payment/save-chat', [verifyClientToken], AuthController.paymentSaveChat);

router.get('/payment/methods', [verifyClientToken], AuthController.paymentMethods);

router.post('/update-password', [verifyClientToken], AuthController.resetPassword);

//Get a user admin by id
router.get('/:id', AuthController.findAuthById);

//Update a user admin by id
router.patch('/profile', [verifyClientToken], uploads.single('avatar'), AuthController.updateAAuth);

router.put('/upade-wallet-balance/:id', AuthController.updateWalletBalance);

//Delete a user admin by id
router.delete('/:id', AuthController.deleteAAuth);

module.exports = router;