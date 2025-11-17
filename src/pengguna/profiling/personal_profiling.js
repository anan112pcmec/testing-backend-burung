// k6 run profiling/personal_profiling.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "1s",  // lama test
};

export default function () {
  const url = "http://localhost:8080/user/profiling/personal-update"; // ganti sesuai server

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "username_baru",
      email_pengguna: "emailbaru@example.com"
    },
    update_username_user: "ananlol",
    update_nama_user: "Nama Baru",
    update_email_user: "ananlol156@gmail.com"
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer TOKEN_JIKA_PAKAI_AUTH"
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "status 200 / 201": (r) => r.status === 200 || r.status === 201,
    "response exists": (r) => r.body !== null,
  });

  console.log(res.body)

  sleep(1);
}
