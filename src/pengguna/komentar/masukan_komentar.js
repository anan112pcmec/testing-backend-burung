import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // satu virtual user
  duration: '15s',   // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/user/komentar-barang/tambah'; // ganti sesuai server

  const payload = JSON.stringify({
    ini_id:{
        id_pengguna:1,
        username_pengguna:"ananlol",
        email_pengguna:"ananlol156@gmail.com",
    },
    ini_komentar:"makna atap",
    ini_idbarang:2 // contoh ID barang induk yang ingin di-down stok
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // request POST
  const res = http.post(url, payload, params);

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
