// k6 run media/hapus_brand_data_surat_kerjasama_dokumen.js

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
    id_brand_data: 5, // ⬅️ sesuai DB
    id_media_brand_data_surat_kerjasama_dokumen: 12, // ⬅️ ID media
    key_dokumen: "brand/5/surat_kerjasama/uuid.pdf", // ⬅️ KEY DI MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-dokumen-brand-data-surat-kerjasama",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus dokumen status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
