import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 100,
  duration: '30s',
};

export default function() {
  let res = http.get('http://localhost:8080/user/makan');
}
