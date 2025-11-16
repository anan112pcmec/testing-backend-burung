// k6 run credential/validate_ubah_pass_pin.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  duration: "1s",      // durasi test
};

const BASE_URL = "http://localhost:8080"; // GANTI jika perlu

export default function () {
  const payload = JSON.stringify({
    id_pengguna: 1,                   // Ubah sesuai test
    pin_key_ubah_password: "123456"   // PIN yang sedang diuji
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(
    `${BASE_URL}/user/credential/validate-password-pin`,
    payload,
    { headers }
  );

  check(res, {
    "Status 200 OK": (r) => r.status === 200,
    "Ada response body": (r) => r.body.length > 0,
  });

  sleep(1);
}
