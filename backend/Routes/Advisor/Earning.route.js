const express = require('express');
const router = express.Router();

const EarningController = require('../../Controllers/Advisor/Earning.Controller');

const { verifyAdvisorToken } = require("../../Middleware/auth");

router.post('/', EarningController.createNewEarning);
router.get('/', [verifyAdvisorToken], EarningController.getAllEarnings);
router.get('/:id', EarningController.findEarningById);
router.put('/:id', EarningController.updateEarning);
router.delete('/:id', EarningController.deleteEarning);
router.post('/payout', EarningController.createPayout);
router.post('/adminpayout', EarningController.AdmincreatePayout);

module.exports = router;