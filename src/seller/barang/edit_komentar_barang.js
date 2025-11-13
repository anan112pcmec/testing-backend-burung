// k6 run barang/edit_komentar_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // jumlah virtual user
  iterations: 1, // berapa kali dijalankan
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-barang/edit'; // ganti sesuai endpoint server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_komentar_edit_komentar: 1, // ganti sesuai ID komentar yang ingin diedit
    komentar_edit_komentar: "Update: produk masih keren tapi kirimannya agak lama kemarin."
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.patch(url, payload, params);

  console.log("Response Body:");
  console.log(res.body);

  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
