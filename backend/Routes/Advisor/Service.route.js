const express = require('express');
const router = express.Router();

const ServiceController = require('../../Controllers/Advisor/Service.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', [verifyAdvisorToken], ServiceController.createNewService);
router.get('/', [verifyAdvisorToken], ServiceController.getAllServices);
router.get('/all', ServiceController.getServices);
router.get('/:id', ServiceController.findServiceById);
router.put('/:id', [verifyAdvisorToken], ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

module.exports = router;