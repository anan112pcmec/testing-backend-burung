// k6 run barang/masukan_komentar_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // satu virtual user
  iterations: 1, // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-barang/tambah'; // ganti sesuai alamat server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_masukan_komentar: 2,
    komentar_masukan_komentar: "Kemejanya keren banget, bahan halus dan potongannya rapi!"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log("Response Body:");
  console.log(res.body);

  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
