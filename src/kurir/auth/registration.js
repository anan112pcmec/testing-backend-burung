// k6 run auth/registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration';

  const payload = JSON.stringify({
    nama: `andhi`,
    email: `ananlol156@gmail.com`,
    password_hash: "password12345",
    username: `abangkuabangcelek`
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
