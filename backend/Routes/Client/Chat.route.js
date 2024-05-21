const express = require('express');
const router = express.Router();

const ChatController = require('../../Controllers/Client/Chat.Controller');
const Chatappcontroller = require('../../Controllers/Frontend/ChatNotification.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/', [verifyClientToken], ChatController.createNewChat);
router.get('/', [verifyClientToken], ChatController.getAllChats);
router.get('/all', ChatController.getChats);
router.get('/:id', ChatController.findChatById);
router.put('/:id', ChatController.updateChat);
router.delete('/:id', ChatController.deleteChat);

module.exports = router;