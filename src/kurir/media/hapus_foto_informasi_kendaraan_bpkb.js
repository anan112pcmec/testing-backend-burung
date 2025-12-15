// k6 run media/hapus_foto_informasi_kendaraan_bpkb.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  // Payload hapus foto BPKB kurir
  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com"
    },
    id_media_informasi_kendaraan_kurir_bpkb_foto: 15, // ⬅️ pastikan ID ada di DB
    key_foto: "kurir_bpkb_20251215.pdf"
  });

  const res = http.del(
    "http://localhost:8080/kurir/media/hapus-foto-informasi-kendaraan-kurir-bpkb",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus foto BPKB status 200": (r) => r.status === 200,
  });

  console.log("Response:", res.body);
  sleep(1);
}
