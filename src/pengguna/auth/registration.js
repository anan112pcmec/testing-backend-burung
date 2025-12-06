// k6 run auth/registration.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 3,           // jumlah virtual user
  duration: '10s',  // lama test
};

export default function () {
  const url = 'http://localhost:8080/auth/user/registration';

  const payload = JSON.stringify({
    username: 'ananlol123456',
    nama: 'anancihuy',
    email: 'appburung@gmail.com',
    password_hash: 'SuperSecret123',
    pin_hash: '123456',
    status: 'Offline',
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

  sleep(1);
}
