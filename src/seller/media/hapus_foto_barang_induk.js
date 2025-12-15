// k6 run media/hapus_foto_barang_induk.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  // Payload hapus foto barang induk seller (multi-file)
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    data_media_dan_key: [
      { id_media_barang_induk_foto: 20, key: "barang1.jpg" },
      { id_media_barang_induk_foto: 21, key: "barang2.jpg" },
      { id_media_barang_induk_foto: 22, key: "barang3.jpg" },
    ],
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-barang-induk",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus foto barang induk status 200": (r) => r.status === 200,
  });

  console.log("Response:", res.body);
  sleep(1);
}
