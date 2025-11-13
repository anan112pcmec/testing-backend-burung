// k6 run barang/edit_alamat_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual users
  iterations: 1, // tiap VU jalan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/edit-alamat-barang-induk'; // ganti sesuai URL server

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,       // contoh ID barang induk
    id_alamat_gudang: 8       // contoh ID alamat gudang baru
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // POST request
  const res = http.patch(url, payload, params);

  // tampilkan hasil response
  console.log("Response Status: " + res.status);
  console.log("Response Body:");
  console.log(res.body);

  // cek response
  check(res, {
    'status 200': (r) => r.status === 200,
    'body tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
