import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const url = 'http://localhost:8080/auth/user/registration/validate';

  const payload = JSON.stringify({
    otp_key: '99019600', // ganti sesuai OTP yang kamu pakai
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
