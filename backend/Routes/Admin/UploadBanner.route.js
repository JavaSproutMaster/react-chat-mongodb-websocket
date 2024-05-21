const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/banners/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });


var storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/banners/contactus');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage1 });

const UploadBannerController = require('../../Controllers/Admin/UploadBanner.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', uploads.array('images', 10), UploadBannerController.createNewUploadBanner);
router.post('/contactus', upload.single('image'), UploadBannerController.createNewUploadBannerContactUs);
router.get('/', UploadBannerController.getAllUploadBanners);
router.get('/all', UploadBannerController.getUploadBanners);
router.get('/contactus', UploadBannerController.findUploadBannerById);
router.put('/:id', UploadBannerController.updateUploadBanner);
router.delete('/:id', UploadBannerController.deleteUploadBanner);

module.exports = router;