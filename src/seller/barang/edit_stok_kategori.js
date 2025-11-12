import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // satu virtual user aja cukup
  iterations: 1, // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/edit/stok-barang'; // sesuaikan dengan alamat server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,
    id_kategori: 5,
    update_stok: 20
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.patch(url, payload, params);

  // tampilkan isi respons di terminal
  console.log("Response Body:");
  console.log(res.body);

  // verifikasi hasil
  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
