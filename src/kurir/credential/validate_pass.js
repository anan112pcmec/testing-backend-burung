// k6 run credential/validate_pass.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// ValidateUbahPassOTP:

// Skema Benar:   Menyertakan Identitas Kurir
//                OTP key ubah password valid / sesuai

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                OTP key ubah password kosong / tidak valid / salah

export default function () {
  const url = 'http://localhost:8080/kurir/credential/validate-ubah-pass-otp';
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
    otp_key_ubah_password: "39464491", // OTP valid/sesuai
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
    otp_key_ubah_password: "", // Kosong / Tidak valid
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