// k6 run media/hapus_distributor_data_dokumen.js

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
    id_distributor_data: 8,                 // ⬅️ SESUAI DB
    id_media_distributor_data_dokumen: 5,   // ⬅️ SESUAI DB
    key_dokumen: "seller/distributor_data/8/dokumen_5.pdf", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-dokumen-distributor-data",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete dokumen distributor status 200": (r) => r.status === 200,
  });

  sleep(1);
}
