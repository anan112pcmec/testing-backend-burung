// k6 run media/hapus_foto_brand_data_npwp.js

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
    id_brand_data: 5,
    id_media_brand_data_npwp_foto: 41, // ⬅️ ID media NPWP foto
    key_foto: "brand/npwp/npwp_abc.jpg", // ⬅️ key object di MinIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-brand-data-npwp",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus foto brand data NPWP status 200": (r) => r.status === 200,
  });

  sleep(1);
}
