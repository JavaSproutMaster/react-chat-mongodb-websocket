const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/chattopics/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const ChatTopicsController = require('../../Controllers/Admin/Signupinfo.controller');

router.get('/', ChatTopicsController.getSignupinfo);
router.put('/:id', uploads.any() , ChatTopicsController.updateSingupinfo);
router.post('/:id', ChatTopicsController.deleteImage);

module.exports = router;