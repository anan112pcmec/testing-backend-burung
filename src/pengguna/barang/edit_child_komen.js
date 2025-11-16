// k6 run barang/edit_child_komen.js

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,          // jumlah virtual user
  duration: "15s",  // lama test
};

export default function () {
  const url = "http://localhost:8080/user/barang/komentar-child/edit"; 
  // ⚠️ GANTI kalau endpoint-mu beda

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_child_komentar: 21,                        // GANTI sesuai data real
    komentar_child_komentar: "Komentar child ini sudah saya ubah via k6!"
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer TOKEN_JIKA_PAKAI_AUTH"
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "Status 200 OK": (r) => r.status === 200,
    "Response tidak kosong": (r) => r.body.length > 0,
  });

}
