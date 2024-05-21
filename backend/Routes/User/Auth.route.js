const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, 'uploads/client/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const AuthController = require('../../Controllers/User/Auth.Controller');

const PasswordReset = require('../../Controllers/User/PasswordReset.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.get('/confirm-email/:confirmationCode', AuthController.confirmEmail);

router.get('/profile', [verifyUserToken], AuthController.profile);

router.post("/password-reset", PasswordReset.resetPasswordEmail);

router.post("/password-reset/:userId/:token", PasswordReset.resetPassword);

//Create a new user admin
router.post('/login', AuthController.login);

router.get('/logout', [verifyUserToken], AuthController.adminLogout);

router.post('/register', AuthController.register);

router.post('/update-password', [verifyUserToken], AuthController.resetPassword);

//Get a user admin by id
router.get('/:id', AuthController.findAuthById);

//Update a user admin by id
router.patch('/profile', [verifyUserToken], uploads.single('avatar'), AuthController.updateAAuth);

//Delete a user admin by id
router.delete('/:id', AuthController.deleteAAuth);

module.exports = router;