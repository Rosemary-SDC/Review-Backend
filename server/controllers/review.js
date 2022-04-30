const NodeCache = require('node-cache');
const models = require('../models/index');
// connect to

const reviewCache = new NodeCache();

module.exports = {
  getAllReviews(req, res) {
    const { product_id } = req.query;
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant';
    // add cache layer to the get reviews sort by relevant
    // since it is the default setting on the front-end
    if (sort === 'relevant') {
      // set key as “product_id"
      if (reviewCache.has(req.query.product_id)) {
        console.log('from cache!');
        res.status(200).send(reviewCache.get(req.query.product_id));
      } else {
        models.review.getAllReviews(page, count, sort, product_id, (err, data) => {
          if (err) {
            console.log('Controller error in getAllReviews: ', err);
            res.status(400).send(err);
          } else {
            reviewCache.set(req.query.product_id, data);
            console.log('set cache!');
            res.status(200).send(data);
          }
        });
      }
    } else {
      models.review.getAllReviews(page, count, sort, product_id, (err, data) => {
        if (err) {
          console.log('Controller error in getAllReviews: ', err);
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    }
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
        res.status(204).send('Marked!');
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
        res.status(204).send('Reported!');
      }
    });
  },

};
