import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // satu virtual user aja cukup
  duration: "30s", // durasi test
};

export default function () {
  const url = 'http://localhost:8080/seller/hapus_kategori_barang'; // ganti sesuai base URL kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,
    id_kategori_barang: 6 // contoh ID kategori yang ingin dihapus
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.del(url, payload, params);

  // tampilkan hasil response di terminal
  console.log("Response Body:");
  console.log(res.body);

  // cek hasil response
  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

}
