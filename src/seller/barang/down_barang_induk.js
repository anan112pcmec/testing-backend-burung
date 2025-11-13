import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // satu virtual user
  iterations: 1,   // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/down-barang-induk'; // ganti sesuai server

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_down: 3  // contoh ID barang induk yang ingin di-down stok
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

  sleep(1);
}
