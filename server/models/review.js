// note: to_timestamp(question_date/1000);
const pool = require('../../database');

module.exports = {
  getAllReviews(page, count, sort, product_id, callback) {
    // const { page, count, sort, product_id } = query;
    // set up the sort condition base on the user's choice;
    let sortBy;
    if (sort === 'relevant') (sortBy = 'helpfulness DESC, date DESC');
    else if (sort === 'newest') (sortBy = 'date DESC');
    else if (sort === 'helpful') (sortBy = 'helpfulness DESC');

    const queryString = `
      SELECT r.id AS review_id,
      r.rating,
      r.summary,
      r.recommend,
      r.response,
      r.body,
      to_timestamp(r.date/1000) as date,
      r.reviewer_name,
      r.helpfulness,
      (
        SELECT array_to_json(array_agg(row_to_json(t)))
        FROM (
          SELECT reviews_photos.url
          FROM reviews
          LEFT JOIN reviews_photos ON reviews.id = reviews_photos.reviews_id
          WHERE reviews_photos.reviews_id = r.id
        ) t
      ) as photos
      FROM reviews r
      WHERE r.product_id = ${product_id} and r.reported <> true
      ORDER BY ${sortBy}
      LIMIT ${count}
      OFFSET ${count * page}
    `;
    return pool.query(queryString, (err, results) => {
      const formattedData = {
        product: product_id, page, count, results: results.rows,
      };
      callback(err, formattedData);
    });
  },

  getReviewMeta(product_id, callback) {
    const formatData = (dataArray) => {
      const result = {};
      result.product_id = product_id;
      result.ratings = {};
      result.recommended = {};
      result.characteristics = {};
      const sum = {};
      const count = {};
      dataArray.forEach((data) => {
        result.ratings[data.rating] = result.ratings[data.rating] + 1 || 1;
        result.recommended[data.recommend] = result.recommended[data.recommend] + 1 || 1;
        data.characteristics.forEach((char) => {
          result.characteristics[char.name] = { id: char.id, value: char.value };
          sum[char.name] = sum[char.name] + char.value || char.value;
          count[char.name] = count[char.name] + 1 || 1;
        });
      });
      const keys = Object.keys(result.characteristics);
      keys.forEach((key) => {
        result.characteristics[key].value = sum[key] / count[key];
      });
      return result;
    };

    const queryString = `
    SELECT rating, recommend,
    json_agg(json_build_object(
      'id', characteristic_reviews.characteristic_id,
      'name', characteristics.name,
      'value', characteristic_reviews.value
    )) AS characteristics
    FROM reviews
    LEFT JOIN characteristic_reviews ON characteristic_reviews.review_id = reviews.id
    LEFT JOIN characteristics ON characteristics.id = characteristic_reviews.characteristic_id
    WHERE reviews.product_id = ${product_id}
    GROUP BY reviews.id
    `;
    return pool.query(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, formatData(results.rows));
      }
    });
  },
  
};
