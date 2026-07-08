// k6 run /auth/login.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const url = 'http://localhost:8080/auth/seller/login';

  const payload = JSON.stringify({
    email: 'appburung@gmail.com',
    password_hash: 'ApparelProSecure@2025',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  try {
    console.log(JSON.stringify(JSON.parse(res.body), null, 2));
  } catch {
    console.log(res.body);
  }

}
