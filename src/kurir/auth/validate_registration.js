// k6 run auth/validate_registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration/validate';

  const payload = JSON.stringify({
    otp_key: "86541715",
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
