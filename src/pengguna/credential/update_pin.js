// k6 run credential/update_pin.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  duration: "1s",      // durasi test
};

const BASE_URL = "http://localhost:8080"; // GANTI sesuai host API kamu

export default function () {
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    pin_baru_update_pin: "123456",
    pin_lama_update_pin: "987654",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(
    `${BASE_URL}/user/credential/update-pin`,
    payload,
    { headers }
  );

  check(res, {
    "Status 200": (r) => r.status === 200,
    "Ada response body": (r) => r.body.length > 0,
  });
  sleep(1);
}
