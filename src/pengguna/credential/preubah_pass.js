// k6 run credential/preubah_pass.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  duration: "10s",       // durasi test
};

export default function () {
  const url = "http://localhost:8080/user/credential/update-password";

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    password_sebelum_user: "PasswordBaru123!",     // ⚠️ HARUS sesuai password di DB
    password_baru_user: "makan_atap",
    faktor_kedua_ganti_password_user: "PIN",    // misalnya OTP, PIN, dll
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "Status 200": (r) => r.status === 200,
    "Body tidak kosong": (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
