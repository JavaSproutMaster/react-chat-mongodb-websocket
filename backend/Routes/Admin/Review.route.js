const express = require('express');
const router = express.Router();

const ReviewController = require('../../Controllers/Admin/Review.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', [verifyUserToken], ReviewController.createNewReview);
router.get('/', [verifyUserToken], ReviewController.getAllReviews);
router.get('/:id', ReviewController.findReviewById);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;