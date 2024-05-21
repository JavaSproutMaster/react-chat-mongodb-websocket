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

const AdvisorAuthController = require('../../Controllers/Frontend/Advisor.Controller');
const ClientAuthController = require('../../Controllers/Frontend/Client.Controller');
const ChatNotificationController = require('../../Controllers/Frontend/ChatNotification.Controller');
const AdminController = require('../../Controllers/Admin/Admin.Controller');

router.get("/all-advisors", AdvisorAuthController.getAllAdvisors);
router.get("/getAdvisor-availability/:id", AdvisorAuthController.findCalendarAvailabilityByAdvisor);
router.get("/getBookings/:id", AdvisorAuthController.getCalendarAvailabilityBooked);
router.get("/advisors", AdvisorAuthController.getAdvisors);
router.get("/advisor/services/:id", AdvisorAuthController.getAdvisorServices);
router.put("/advisor/services/:id", AdvisorAuthController.updateAdvisorService);
router.patch("/advisor/:id", uploads.any(), AdvisorAuthController.updateAdvisor);
router.get("/advisor/:id", AdvisorAuthController.getAdvisor);
router.get("/client/:id", ClientAuthController.getClient);
router.get("/clients/:client_id/:advisor_id", ClientAuthController.getClientt);
router.post("/notification/add", ChatNotificationController.InsertChatNotification);
router.post("/notification/offline", ChatNotificationController.InsertChatOffLineNotification);
router.post("/save-enquery", ChatNotificationController.InsertChatNotification);
router.delete('/notification/delete/:id', ChatNotificationController.deleteNotification);
router.get('/notifications/:id', ChatNotificationController.getnotificationForClients);
router.post('/add-clients-advisors', AdvisorAuthController.addClientsAdvisors);
router.post('/send-client-advisor-chat-log', AdvisorAuthController.sendClientsAdvisorsChatLogs);
router.post('/profile-images', AdvisorAuthController.profileImages);
router.post('/send-advisor-chat-mail', AdvisorAuthController.sendAdvisorChatMail);
router.get('/advisorStatus/:id', ChatNotificationController.getAdvisorChatEnagaeStatus);
router.get('/getAdvisorChatStatus/:id', AdvisorAuthController.getAdvisorChatStatus);
router.get('/get-advisor-chat-status/:id', AdvisorAuthController.getAdvisorChatStatusByid);
router.post('/update-client-online-status', ClientAuthController.updateClientOnlineStatus);
router.get('/get-client-online-status/:id', ClientAuthController.getClientOnlineStatus);

router.post('/clients/updatePromoAmount', AdminController.updatePromotionAmount);


module.exports = router;