const express = require('express');
const router = express.Router();

const ChatController = require('../../Controllers/Advisor/Chat.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], ChatController.createNewChat);
router.get('/', [verifyAdvisorToken], ChatController.getAllChats);
router.get('/all', ChatController.getChats);
router.get('/:id', ChatController.findChatById);
router.put('/:id', ChatController.updateChat);
router.delete('/:id', ChatController.deleteChat);

module.exports = router;