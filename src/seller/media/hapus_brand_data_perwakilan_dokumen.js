// k6 run media/hapus_dokumen_brand_data_perwakilan.js

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
    id_media_brand_data_perwakilan_dokumen: 11, // ⬅️ ID media di DB
    key_dokumen: "brand/perwakilan/surat_perwakilan_abc.pdf", // ⬅️ key object di MinIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-dokumen-brand-data-perwakilan",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus dokumen brand perwakilan status 200": (r) => r.status === 200,
  });

  sleep(1);
}
