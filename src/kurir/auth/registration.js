// k6 run auth/registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  vus: 1,       // jumlah virtual users
  duration: '5s', // durasi test
};

export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration';

  // Generate dummy random data
  const randomId = uuidv4().substring(0, 8);

  const payload = JSON.stringify({
    nama_kurir: `Kurir ${randomId}`,
    email_kurir: `ananlol156@gmail.com`,
    pass_kurir: "password12345",
    username_kurir: `kurir_${randomId}`
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status 200 atau 201': (r) => r.status === 200 || r.status === 201,
    'response ada field pesan': (r) => r.body && r.body.length > 0,
  });


  console.log(res.body);
  sleep(1);
}
