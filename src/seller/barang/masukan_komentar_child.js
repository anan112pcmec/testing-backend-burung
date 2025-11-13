// k6 run barang/masukan_komentar_child.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // jumlah virtual user
  iterations: 1, // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-child/tambah'; // ganti sesuai alamat server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_komentar_masukan_komentar: 2, // ID komentar induk yang ingin diberi child
    id_barang_induk_child_komentar: 2, // ID barang induk yang sama dengan komentar induk
    komentar_masukan_komentar: "Mantap Man"
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
    'status 200 OK': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
