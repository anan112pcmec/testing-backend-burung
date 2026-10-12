// k6 run media/hapus_foto_profil_kurir.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// HapusFotoProfilKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdMediaKurirProfilFoto lebih besar dari 0
//                KeyFoto bukan string kosong

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdMediaKurirProfilFoto lebih kecil atau sama dengan 0
//                KeyFoto berupa string kosong

export default function () {
  const url = "http://localhost:8080/kurir/media/hapus-foto-profil-kurir";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    id_media_kurir_profil_foto: 123,                 // > 0
    key_foto: "profil/kurir/2025/12/15/foto123.jpg", // Tidak kosong
  });

  const resBenar = http.del(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200 / 204": (r) => r.status === 200 || r.status === 204,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    id_media_kurir_profil_foto: 0,                   // <= 0
    key_foto: "",                                    // String kosong
  });

  const resSalah = http.del(url, payloadSalah, params);

  check(resSalah, {
    "skema salah ditolak (bukan 200/204)": (r) => r.status !== 200 && r.status !== 204,
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