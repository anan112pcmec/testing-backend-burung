// k6 run media/hapus_foto_banner.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_seller_banner_foto: 1, // ⬅️ SESUAI DB
    key_foto: "/media_seller_banner_foto/1/5dbc86481c5d135a28c6dab9-pto.jpg", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-banner",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete banner status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
