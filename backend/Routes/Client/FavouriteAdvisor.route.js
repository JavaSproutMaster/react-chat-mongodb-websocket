const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const FavouriteAdvisorController = require('../../Controllers/Client/FavouriteAdvisor.Controller');

const { verifyClientToken } = require("../../Middleware/auth");

router.post('/', [verifyClientToken], FavouriteAdvisorController.createNewFavouriteAdvisor);
router.get('/', [verifyClientToken], FavouriteAdvisorController.getAllFavouriteAdvisors);
router.get('/:id', FavouriteAdvisorController.findFavouriteAdvisorById);
router.put('/:id', FavouriteAdvisorController.updateFavouriteAdvisor);
router.delete('/:id', [verifyClientToken], FavouriteAdvisorController.deleteFavouriteAdvisor);

module.exports = router;