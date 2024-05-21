const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/logo/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var uploads = multer({ storage: storage });

const SettingController = require('../../Controllers/Admin/Setting.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.get('/global', [verifyUserToken], SettingController.getGlobalSettings);
router.get('/global/logo', SettingController.getGlobalSetting);
router.put('/global', SettingController.updateGlobalSettings);
router.post('/global/upload-logo', uploads.single('logo'), SettingController.uploadLogoSetting);

module.exports = router;