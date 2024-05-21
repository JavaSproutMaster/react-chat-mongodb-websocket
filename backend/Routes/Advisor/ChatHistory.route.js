const express = require('express');
const router = express.Router();

const ChatHistoryController = require('../../Controllers/Advisor/ChatHistory.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], ChatHistoryController.createNewChatHistory);
router.get('/', [verifyAdvisorToken], ChatHistoryController.getAllChatHistorys);
router.get('/clients', [verifyAdvisorToken], ChatHistoryController.getAllChatClients);
router.get('/all', ChatHistoryController.getChatHistorys);
router.get('/:id', [verifyAdvisorToken], ChatHistoryController.findChatHistoryById);
router.put('/:id', ChatHistoryController.updateChatHistory);
router.delete('/:id', ChatHistoryController.deleteChatHistory);

module.exports = router;