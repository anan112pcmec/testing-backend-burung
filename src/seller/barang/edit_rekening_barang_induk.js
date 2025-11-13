// k6 run barang/edit_rekening_barang_induk.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,        // jumlah virtual users
  iterations: 24000, // setiap VU jalan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/edit-rekening-barang'; // ganti sesuai URL server

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,        // contoh ID barang induk
    id_rekening_seller: 12     // contoh ID rekening seller baru
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // request POST
  const res = http.patch(url, payload, params);

  // tampilkan hasil response
  console.log("Response Status: " + res.status);
  console.log("Response Body:");
  console.log(res.body);

  // cek hasil response
  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

}
