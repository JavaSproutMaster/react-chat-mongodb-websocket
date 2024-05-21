const express = require('express');
const router = express.Router();

const KeywordController = require('../../Controllers/Admin/Keyword.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], KeywordController.createNewKeyword);
router.get('/', KeywordController.getAllKeywords);
router.get('/all', KeywordController.getKeywords);
router.get('/:id', KeywordController.findKeywordById);
router.put('/:id', KeywordController.updateKeyword);
router.delete('/:id', KeywordController.deleteKeyword);

module.exports = router;