// k6 run /auth/login.js


import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,           // jumlah virtual user
  duration: '5s',  // lama test
};

export default function () {
  const url = 'http://localhost:8080/auth/user/login';

  const payload = JSON.stringify({
    email: 'anan29837@gmail.com',
    password_hash: 'rahasiadeh123',
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

  sleep(1)
}
