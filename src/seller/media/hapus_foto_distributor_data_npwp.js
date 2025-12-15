// k6 run media/hapus_foto_distributor_data_npwp.js

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
    id_distributor_data: 8, // ⬅️ SESUAI DB
    id_media_distributor_data_npwp_foto: 3, // ⬅️ SESUAI DB
    key_foto: "seller/distributor_data/8/npwp/foto_3.jpg", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-distributor-data-npwp",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete foto npwp status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
