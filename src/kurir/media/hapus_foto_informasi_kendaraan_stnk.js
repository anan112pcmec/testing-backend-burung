// k6 run media/hapus_foto_informasi_kendaraan_stnk.js

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
      email_kurir: "anan29837@gmail.com"
    },
    id_media_informasi_kendaraan_kurir_stnk_foto: 123, // ⬅️ ganti sesuai DB
    key_foto: "stnk_kurir/abc123.jpg",                 // ⬅️ key dari MinIO / metadata
  });

  const res = http.del(
    "http://localhost:8080/kurir/media/hapus-foto-informasi-kendaraan-kurir-stnk",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus stnk kurir status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
