// k6 run barang/hapus_komentar_barang.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // jumlah virtual users
  duration: '15s', // lama waktu test
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-barang/hapus';

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_komentar_hapus_komentar: 1 // ID komentar yang mau dihapus
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.del(url, payload, params);

  check(res, {
    'status 200 OK': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

}
