// k6 run barang/edit_alamat_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual users
  iterations: 1, // setiap VU jalan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/edit-alamat-kategori'; // ganti sesuai URL server

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 6,        // contoh ID barang induk
    id_kategori_barang: 14,     // contoh ID kategori barang
    id_alamat_gudang: 5        // contoh ID alamat gudang baru
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
