const express = require('express');
const router = express.Router();

const EarningController = require('../../Controllers/Admin/Earning.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', EarningController.createNewEarning);
router.get('/', [verifyUserToken], EarningController.getAllEarnings);
router.get('/:id', EarningController.findEarningById);
router.put('/:id', EarningController.updateEarning);
router.delete('/:id', EarningController.deleteEarning);
router.post('/payout', EarningController.createPayout);

module.exports = router;