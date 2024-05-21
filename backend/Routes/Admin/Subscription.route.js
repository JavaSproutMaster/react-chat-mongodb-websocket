const express = require('express');
const router = express.Router();

const SubscriptionController = require('../../Controllers/Admin/Subscription.Controller');

router.post('/', SubscriptionController.createNewSubscription);
router.get('/', SubscriptionController.getAllSubscriptions);
router.get('/:id', SubscriptionController.findSubscriptionById);
router.put('/:id', SubscriptionController.updateSubscription);
router.delete('/:id', SubscriptionController.deleteSubscription);

module.exports = router;