const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const AuthController = require('../../Controllers/Admin/Auth.Controller');

const PasswordReset = require('../../Controllers/Admin/PasswordReset.Controller');

router.post("/password-reset", PasswordReset.resetPasswordEmail);

router.post("/password-reset/:userId/:token", PasswordReset.resetPassword);

const { verifyUserToken } = require("../../Middleware/auth");

router.get('/info', [verifyUserToken], AuthController.verifyAToken);

router.get('/users', [verifyUserToken], AuthController.getAll);

router.get('/profile', [verifyUserToken], AuthController.profile);

//Create a new user admin
router.post('/login', AuthController.login);

router.get('/logout', [verifyUserToken], AuthController.adminLogout);

router.post('/register', AuthController.register);
router.post('/update-password', [verifyUserToken], AuthController.resetPassword);

//Get a user admin by id
router.get('/:id', AuthController.findById);

//Update a user admin by id
router.patch('/profile', [verifyUserToken], uploads.single('avatar'), AuthController.update);

//Delete a user admin by id
router.delete('/:id', AuthController.delete);

module.exports = router;