// k6 run barang/edit_komentar.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 10,          // jumlah virtual user
  duration: "30s",  // lama test
};

export default function () {
  const url = "http://localhost:8080/user/barang/komentar-barang/edit";  // GANTI jika beda

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_komentar_edit_komentar: 1147,                   // ganti sesuai data lu
    komentar_edit_komentar: "Komentar sudah diedit!" // ganti kapan saja
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "status 200": (r) => r.status === 200,
    "response not empty": (r) => r.body.length > 0,
  });

}
