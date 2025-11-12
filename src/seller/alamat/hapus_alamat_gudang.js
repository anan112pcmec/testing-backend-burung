import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // jumlah virtual users
  duration: '30s',  // durasi pengujian
};

export default function () {
  const url = 'http://localhost:8080/seller/alamat/hapus-alamat-gudang';

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_hapus_alamat_gudang: 1
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.del(url, payload, params);

  console.log(`Response: ${res.body}`);

  check(res, {
    'status 200': (r) => r.status === 200,
  });

}
