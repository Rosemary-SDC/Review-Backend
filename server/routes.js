const router = require('express').Router();
const controller = require('./controllers/index');

// Connect controller methods to their corresponding routes
router.get('/reviews/', controller.review.getAllReviews);
router.get('/reviews/meta/', controller.review.getReviewMeta);
router.post('/reviews', controller.review.postReview);
router.put('/reviews/:review_id/helpful', controller.review.markHelpful);
router.put('/reviews/:review_id/report', controller.review.markReport);

module.exports = router;
