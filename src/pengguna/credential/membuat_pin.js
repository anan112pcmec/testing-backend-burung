// k6 run credential/membuat_pin.js

import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user (bisa ubah sesuai kebutuhan)
  duration: "10s",      // durasi test
};

const BASE_URL = "http://localhost:8080"; // GANTI sesuai domain API kamu

export default function () {
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    password_user_membuat_pin: "PasswordBaru123!",
    pin_user_membuat_pin: "123456"
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(
    `${BASE_URL}/user/credential/membuat-pin`,
    payload,
    { headers }
  );

  check(res, {
    "Status 200 OK": (r) => r.status === 200,
    "Ada response body": (r) => r.body.length > 0,
  });

  sleep(1);
}
