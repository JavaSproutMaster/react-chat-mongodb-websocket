const express = require('express');
const router = express.Router();

const ServiceController = require('../../Controllers/Frontend/Service.Controller');

router.post('/', ServiceController.createNewService);
router.get('/', ServiceController.getAllServices);
router.get('/all', ServiceController.getServices);
router.get('/:id', ServiceController.findServiceById);
router.put('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

module.exports = router;