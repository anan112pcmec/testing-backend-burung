// k6 run profiling/personal_profiling.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual user (bisa kamu ubah)
  duration: '5s' // durasi pengujian
};

export default function () {
  const url = 'http://localhost:8080/seller/profiling/personal-update'; // ganti sesuai alamat API kamu

  const payload = JSON.stringify({
   identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_username_seller: "ananapparel",
    update_nama_seller: "Faiz Apparel",
    update_email_seller: "not"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer contohTokenJWT', // hapus kalau endpoint tidak butuh token
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    'status 200': (r) => r.status === 200,
    'profil berhasil diperbarui': (r) =>
      r.body.includes('berhasil') ||
      r.body.includes('success') ||
      r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
