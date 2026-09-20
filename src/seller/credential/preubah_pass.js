// k6 run credential/preubah_pass.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/credential/update-password";

  // Skema Benar:
  // - Menyertakan identitas seller yang valid
  // - Password Lama: Memiliki setidaknya 1 angka, karakter unik, minimal 10 karakter, dan 1 huruf besar ("ApparelProSecure@2025")
  // - Password Baru: Memiliki setidaknya 1 angka, karakter unik, minimal 10 karakter, dan 1 huruf besar ("PasswordBaru456!")
  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    password_lama_ganti_password: "ApparelProSecure@2025",
    password_baru_ganti_password: "PasswordBaru456!",
  });

  // Skema Salah:
  // - Tidak menyertakan identitas seller (null)
  // - Password Lama: Kurang dari 10 karakter / tidak ada huruf besar / angka / karakter unik ("old")
  // - Password Baru: Kurang dari 10 karakter / tidak ada huruf besar / angka / karakter unik ("new")
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    password_lama_ganti_password: "old",
    password_baru_ganti_password: "new",
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