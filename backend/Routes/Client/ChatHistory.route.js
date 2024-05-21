const express = require('express');
const router = express.Router();

const ChatHistoryController = require('../../Controllers/Client/ChatHistory.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/', [verifyClientToken], ChatHistoryController.createNewChatHistory);
router.get('/', [verifyClientToken], ChatHistoryController.getAllChatHistorys);
router.get('/advisors', [verifyClientToken], ChatHistoryController.getAllChatAdvisors);
router.get('/all', ChatHistoryController.getChatHistorys);
router.get('/:id', [verifyClientToken], ChatHistoryController.findChatHistoryById);
router.put('/:id', ChatHistoryController.updateChatHistory);
router.delete('/:id', ChatHistoryController.deleteChatHistory);

module.exports = router;