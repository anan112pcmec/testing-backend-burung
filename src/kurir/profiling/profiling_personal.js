// k6 run profiling/profiling_personal.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// PersonalProfilingKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                Username harus memiliki minimal 1 angka dan 1 koma (atau sesuai aturan validasi: 1 angka dan koma)
//                Email harus memiliki domain `@gmail.com`

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                Username tidak memiliki angka atau koma
//                Email tidak memiliki `@gmail.com`

export default function () {
  const url = 'http://localhost:8080/kurir/profiling/personal-update';
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
      email_kurir: "anan29837@gmail.com",
      username_kurir: "faiz,kurir1", // Memiliki koma dan angka
    },
    ubah_username_kurir: "faiz,baru1",
    ubah_nama_kurir: "Faiz Kurir",
    ubah_email_kurir: "faizbaru@gmail.com", // Mengandung @gmail.com
  });

  const resBenar = http.patch(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    ubah_username_kurir: "faizkurir",     // Tidak ada angka atau koma
    ubah_nama_kurir: "Faiz Kurir",
    ubah_email_kurir: "faizbaru@yahoo.com", // Tidak mengandung @gmail.com
  });

  const resSalah = http.patch(url, payloadSalah, params);

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