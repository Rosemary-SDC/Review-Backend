const path = require('path');
const frisby = require('frisby');

const baseUrl = 'http://localhost:3000';

it('Get reviews by product_id should return a status of 200 OK', () => (
  frisby
    .get(path.join(baseUrl, '/reviews/?product_id=37318&sort=newest'))
    .expect('status', 200)
));

it('Get review meta data by product_id should return a status of 200 OK', () => (
  frisby
    .get(path.join(baseUrl, '/reviews/meta/?product_id=37318'))
    .expect('status', 200)
));

it('Post review should return a status of 201 created', () => (
  frisby
    .post(path.join(baseUrl, '/reviews'), {
      body: {
        product_id: 37315,
        rating: 5,
        summary: 'Unit Test',
        body: 'Unit Test',
        recommend: true,
        name: 'Testy',
        email: 'test@email.com',
        photos: ['url', 'url'],
        characteristics: {
          125044: 5,
          125045: 4,
          125046: 3,
          125047: 2,
        },
      },
    })
    .expect('status', 201)
));

it('Make review helpful should return a status of 204 OK', () => (
  frisby
    .put(path.join(baseUrl, '/reviews/1/helpful'))
    .expect('status', 204)
));

it('Report Review should return a status of 204 OK', () => (
  frisby
    .put(path.join(baseUrl, '/reviews/1/report'))
    .expect('status', 204)
));
