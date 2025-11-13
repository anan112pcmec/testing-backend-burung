// k6 run barang/mention_komentar_child.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-child-mention/tambah'; // ganti sesuai base URL server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_child_komentar: 2,        // ID barang induk yang relevan
    id_komentar_child_komentar: 1,           // ID komentar child yang akan diberi mention
    username_mention_komentar: "@tokosakura",  // username yang di-mention
    komentar_mention_komentar: "Hai tokosakura, terima kasih sudah kasih masukan!"
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
