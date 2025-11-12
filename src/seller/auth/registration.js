import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 3,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:8080/auth/seller/registration';

  const payload = JSON.stringify({
    username_seller: 'ananapparel',
    nama_seller: 'Anan Apparel Indonesia',
    email_seller: 'anan29837@gmail.com',
    jenis_seller: 'Personal',
    seller_dedication: 'Pakaian & Fashion',
    pass_seller: 'ApparelProSecure@2025',
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
