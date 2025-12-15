// k6 run media/hapus_foto_profil_kurir.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    id_media_kurir_profil_foto: 123, // ⬅️ pastikan ada di DB
    key_foto: "profil/kurir/2025/12/15/foto123.jpg", // ⬅️ sesuai key di DB/MinIO
  });

  const res = http.del(
    "http://localhost:8080/kurir/media/hapus-foto-profil-kurir",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(res, { "hapus foto profil kurir status 200": (r) => r.status === 200 });

  console.log(res.body);
  sleep(1);
}
