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

const AdvisorCertificateController = require('../../Controllers/Advisor/AdvisorCertificate.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/' , uploads.single('certificate'), [verifyAdvisorToken], AdvisorCertificateController.createNewAdvisorCertificate);
router.delete('/:id', [verifyAdvisorToken], AdvisorCertificateController.deleteAdvisorCertificate);
router.get('/', AdvisorCertificateController.getAdvisorCertificate);

module.exports = router;