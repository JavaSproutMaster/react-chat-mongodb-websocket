const express = require('express');
const router = express.Router();

const path = require('path');

const SettingController = require('../../Controllers/Frontend/Setting.Controller');


router.get('/logo', SettingController.getGlobalSetting);
router.get('/commisions', SettingController.getGlobalSettingCommisions);
module.exports = router;