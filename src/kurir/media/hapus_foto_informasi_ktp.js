// k6 run media/hapus_foto_informasi_ktp.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  // Payload hapus foto KTP kurir
  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com"
    },
    id_media_informasi_kurir_ktp_foto: 20, // ⬅️ pastikan ID ada di DB
    key_foto: "kurir_ktp_20251215.jpg"
  });

  const res = http.del(
    "http://localhost:8080/kurir/media/hapus-foto-informasi-kurir-ktp",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus foto KTP status 200": (r) => r.status === 200,
  });

  console.log("Response:", res.body);
  sleep(1);
}
