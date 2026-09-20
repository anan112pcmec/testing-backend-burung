// k6 run credential/validate_pass_otp.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/credential/validate-password-otp";

  // Skema Benar:
  // - Menyertakan identitas seller yang valid
  // - OTP Key: Bernilai angka semua tepat 8 digit ("22781958")
  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    otp_key_validate_ubah_password_seller: "22781958",
  });

  // Skema Salah:
  // - Tidak menyertakan identitas seller (null)
  // - OTP Key: Tidak 8 digit atau mengandung huruf/karakter lain ("12345" atau "2278195A")
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    otp_key_validate_ubah_password_seller: "12345",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer contohTokenJWT", // opsional jika dibutuhkan
    },
  };

  const resBenar = http.patch(url, payloadBenar, params);
  const resSalah = http.patch(url, payloadSalah, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  check(resSalah, {
    "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
  });

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log("Respon Benar: ", resBenar.body);
    console.log("Respon Salah: ", resSalah.body);
  }

  sleep(1);
}