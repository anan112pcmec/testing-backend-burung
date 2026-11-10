// k6 run credential/preubah_pass.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// PreUbahPassword:

// Skema Benar: 	Menyertakan Identitas Kurir	
// 		PasswordLama setidaknya memiliki 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital
// 		PasswordBaru setidaknya memiliki 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital
// 		PasswordBaru tidak sama dengan PasswordLama

// Skema Salah: 	Tidak Menyertakan Identitas Kurir
// 		PasswordLama tidak memiliki setidaknya 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital
// 		PasswordBaru tidak memiliki setidaknya 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital
// 		PasswordBaru sama dengan PasswordLama


export default function () {
  const url = 'http://localhost:8080/kurir/credential/preubah-pass';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_kurir: {
      id_kurir: 1,
      username_kurir: "Abangkuabang1_",
      email_kurir: "anan29837@gmail.com",
    },
    password_lama_kurir: "Password12345_$2",
    password_baru_kurir: "Passwordbaru123_%^2",
  });

  const resBenar = http.patch(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200 / 201": (r) => r.status === 200 || r.status === 201,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    password_lama_kurir: "",    // Kosong / Salah
    password_baru_kurir: "",    // Kosong / Tidak valid
  });

  const resSalah = http.patch(url, payloadSalah, params);

  check(resSalah, {
    "skema salah ditolak (bukan 200/201)": (r) => r.status !== 200 && r.status !== 201,
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