const express = require('express');
const router = express.Router();

const MessageController = require('../../Controllers/Advisor/Message.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");


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



router.post('/', [verifyAdvisorToken], uploads.any(), MessageController.createNewMessage);
router.get('/', [verifyAdvisorToken], MessageController.getAllMessages);
router.get('/clients', [verifyAdvisorToken], MessageController.getAllMessageClients);
router.get('/all', MessageController.getMessages);
router.get('/:id', [verifyAdvisorToken], MessageController.findMessageById);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;