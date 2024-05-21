const { addMessage, updateNote, getNote, updateReceivedAt, getMessages , getMessagesHistory, getMessagesHistoryPaging , deleteChat , getMsgHistoryfirst , getAdvisorNotes } = require("../Controllers/Message.Controller");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/updateRecievedTz/", updateReceivedAt);
router.post("/getNote/", getNote);
router.post("/updateNote/", updateNote);
router.delete("/deletemsg", deleteChat);
router.post("/recentHistory", getMessagesHistory);
router.post("/recent-history", getMessagesHistoryPaging);
router.post("/chatHistory", getMsgHistoryfirst);
router.post("/getNotes", getAdvisorNotes);

// router.post("/getTimers", getTimers);
// router.post("/postTimers", postTimers);

module.exports = router;