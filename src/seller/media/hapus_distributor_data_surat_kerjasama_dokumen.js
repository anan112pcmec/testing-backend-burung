// k6 run media/hapus_dokumen_distributor_data_surat_kerjasama.js

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
    id_distributor_data: 8,
    id_media_distributor_data_surate_kerjasama_dokumen: 12, // ⬅️ ID MEDIA
    key_dokumen: "distributor/surat_kerjasama/abc123.pdf",   // ⬅️ KEY DI MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-dokumen-distributor-data-surat-kerjasama",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "hapus dokumen surat kerjasama status 200": (r) => r.status === 200,
  });

  sleep(1);
}
