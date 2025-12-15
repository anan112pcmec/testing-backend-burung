// k6 run media/hapus_foto_informasi_kendaraan.js

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
    id_media_informasi_kendaraan_kurir_kendaraan_foto: 123, // ⬅️ contoh id media
    key_foto: "media/kendaraan/abc123.jpg"                  // ⬅️ contoh key
  });

  const res = http.del(
    "http://localhost:8080/kurir/media/hapus-foto-informasi-kendaraan-kurir-kendaraan",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(res, { "hapus foto kendaraan status 200": (r) => r.status === 200 });

  console.log(res.body);
  sleep(1);
}
