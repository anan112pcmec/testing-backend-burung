import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 3,           // jumlah virtual user
  duration: '10s',  // lama test
};

export default function () {
  const url = 'http://localhost:8080/auth/user/registration';

  const payload = JSON.stringify({
    username_user: 'ananlol',
    nama_user: 'Anan Lol',
    email_user: 'ananlol156@gmail.com',
    pass_user: 'SuperSecret123',
    pin_user: '123456',
    status_user: 'Offline',
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
