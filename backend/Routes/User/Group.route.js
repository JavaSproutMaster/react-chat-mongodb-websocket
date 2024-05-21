const express = require('express');
const router = express.Router();

const GroupController = require('../../Controllers/Admin/Group.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], GroupController.createNewGroup);
router.get('/', GroupController.getAllGroups);
router.get('/all', GroupController.getGroups);
router.get('/:id', GroupController.findGroupById);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);

module.exports = router;