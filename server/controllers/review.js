const models = require('../models/index');

module.exports = {
  getAllReviews(req, res) {
    const { product_id } = req.query;
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'newest';
    models.review.getAllReviews(page, count, sort, product_id, (err, data) => {
      if (err) {
        console.log('Controller error in getAllReviews: ', err);
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  getReviewMeta(req, res) {
    const { product_id } = req.query;
    models.review.getReviewMeta(product_id, (err, data) => {
      if (err) {
        console.log('Controller error in getReviewMeta: ', err);
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  postReview(req, res) {
    models.review.postReview(req.body, (err, data) => {
      if (err) {
        console.log('Controller error in postReview: ', err);
        res.status(400).send(err);
      } else {
        res.status(201).send('created!');
      }
    });
  },

  markHelpful(req, res) {
    const { review_id } = req.params;
    models.review.markHelpful(review_id, (err, data) => {
      if (err) {
        console.log('Controller error in markHelpful: ', err);
        res.status(400).send(err);
      } else {
        res.status(204).send('marked helpful!');
      }
    });
  },

  markReport(req, res) {
    const { review_id } = req.params;
    models.review.markReport(review_id, (err, data) => {
      if (err) {
        console.log('Controller err in markReport: ', err);
        res.status(400).send(err);
      } else {
        res.status(204);
      }
    });
  },

};
