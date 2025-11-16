// k6 run credential/validate_ubah_pass_otp.js
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 10,          // jumlah virtual user
  duration: "30s",  // durasi test
};

const BASE_URL = "http://localhost:8080"; // ganti dengan URL API kamu

export default function () {
  const payload = JSON.stringify({
    id_pengguna: 1,                // UBAH
    otp_key_ubah_password: "37094142"  // UBAH
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(
    `${BASE_URL}/user/credential/validate-password-otp`,
    payload,
    { headers }
  );

  check(res, {
    "Status is 200": (r) => r.status === 200,
    "Has payload": (r) => r.body.length > 0,
  });

  sleep(1);
}
