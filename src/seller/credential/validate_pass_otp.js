// k6 run credential/validate_pass_otp.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual user
  duration: '2s' // durasi pengujian
};

export default function () {
  const url = 'http://localhost:8080/seller/credential/validate-password-otp'; // ganti dengan endpoint API kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    otp_key_validate_ubah_password_seller: "22781958" // contoh kode OTP validasi
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer contohTokenJWT', // opsional, jika API butuh auth
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    'status 200': (r) => r.status === 200,
    'validasi OTP berhasil': (r) =>
      r.body.includes('berhasil') ||
      r.body.includes('success') ||
      r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
