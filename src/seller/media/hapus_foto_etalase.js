// k6 run media/hapus_foto_etalase_seller.js

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
    id_media_etalase_foto: 7, // ⬅️ SESUAI DATA DB
    key_foto: "seller/etalase/ananapparel/etalase_7.jpg", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-etalase",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete etalase status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
