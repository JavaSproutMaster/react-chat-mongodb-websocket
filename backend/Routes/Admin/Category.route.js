const express = require('express');
const router = express.Router();

const CategoryController = require('../../Controllers/Admin/Category.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], CategoryController.createNewCategory);
router.get('/', CategoryController.getAllCategory);
router.get('/all', CategoryController.getCategory);
router.get('/:id', CategoryController.findCategoryById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;