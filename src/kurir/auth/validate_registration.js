// k6 run auth/validate_registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration/validate';

  // OTP random (6 digit)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const payload = JSON.stringify({
    otp_key: "06500278",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status OK atau 400': (r) => r.status === 200 || r.status === 400,
    'body tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
