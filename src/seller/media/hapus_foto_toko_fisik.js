// k6 run media/hapus_foto_toko_fisik.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  // Payload hapus foto toko fisik seller (multi-file)
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    data_media_dan_key: [
      { id_media_seller_fisik_toko: 10, key: "toko1.jpg" },
      { id_media_seller_fisik_toko: 11, key: "toko2.jpg" },
      { id_media_seller_fisik_toko: 12, key: "toko3.jpg" },
    ],
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-toko-fisik",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus foto toko fisik status 200": (r) => r.status === 200,
  });

  console.log("Response:", res.body);
  sleep(1);
}
