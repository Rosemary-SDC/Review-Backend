-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date DOUBLE PRECISION NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  response TEXT,
  helpfulness INTEGER NOT NULL
);

-- ---
-- Table 'reviews_photos'
--
-- ---

DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  reviews_id INTEGER NOT NULL
  FOREIGN KEY reviews_id REFERENCES reviews(id)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL
);

-- ---
-- Table 'characteristic_reviews'
--
-- ---

DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  FOREIGN KEY review_id REFERENCES reviews(id),
  FOREIGN KEY characteristic_id REFERENCES characteristics(id)
);

