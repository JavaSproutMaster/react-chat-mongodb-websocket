const express = require('express');
const router = express.Router();

const NotificationController = require('../Controllers/Notification.Controller');

const { verifyUserToken } = require("../Middleware/auth");
const { verifyClientToken } = require("../Middleware/auth");
const { verifyAdvisorToken } = require("../Middleware/auth");

router.post('/', NotificationController.createNewNotification);
router.post('/advisor', [verifyClientToken], NotificationController.createAdvisorNotification);
router.post('/client', [verifyAdvisorToken], NotificationController.createClientNotification);
router.get('/', NotificationController.getAllNotifications);
router.get('/all', NotificationController.getNotifications);
router.get('/client', [verifyClientToken], NotificationController.getClientNotifications);
router.get('/advisor', [verifyAdvisorToken], NotificationController.getAdvisorNotifications);
router.get('/:id', NotificationController.findNotificationById);
router.put('/:id', NotificationController.updateNotification);
router.delete('/:id', NotificationController.deleteNotification);

module.exports = router;