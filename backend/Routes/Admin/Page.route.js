const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/pages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const PageController = require('../../Controllers/Admin/Page.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], PageController.createNewPage);
router.post('/upload-image', uploads.single('files'), PageController.uploadPageImage);
router.get('/', PageController.getAllPages);
router.get('/all', PageController.getPages);
router.get('/all/:type', PageController.getPagesByType);
router.get('/get-home-text', PageController.getHomePageText);
router.get('/:id', PageController.findPageById);
router.get('/slug/:slug', PageController.findPageBySlug);
router.put('/update-home-text', PageController.updateHomePageText);
router.put('/:id', PageController.updatePage);
router.delete('/:id', PageController.deletePage);

module.exports = router;