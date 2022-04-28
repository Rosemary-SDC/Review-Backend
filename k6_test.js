import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 120,
  duration: '30s',
};
// get reviews by product_id;
export default function () {
  http.get('http://localhost:3000/reviews/?product_id=37318&sort=newest');
  sleep(1);
}
// run test command: k6 run K6_test.js
