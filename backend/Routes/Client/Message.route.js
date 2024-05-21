const express = require('express');
const router = express.Router();

const MessageController = require('../../Controllers/Client/Message.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/advisor/message/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });


router.post('/', [verifyClientToken], uploads.any() , MessageController.createNewMessage);
router.get('/', [verifyClientToken], MessageController.getAllMessages);
router.get('/advisors', [verifyClientToken], MessageController.getAllMessageAdvisors);
router.get('/all', MessageController.getMessages);
router.get('/:id', [verifyClientToken], MessageController.findMessageById);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;