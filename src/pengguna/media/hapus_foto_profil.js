// k6 run media/hapus_foto_profil.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// HapusFotoProfilPengguna:

// Skema Benar:   Menyertakan Identitas Pengguna
//                IdMediaDataPengguna lebih besar dari 0
//                Keyfoto tak berupa string kosong

// Skema Salah:   Tidak Menyertakan Identitas Pengguna
//                IdMediaDataPengguna lebih kecil atau sama dengan 0
//                Keyfoto berupa string kosong

export default function () {
  const url = "http://localhost:8080/user/media/hapus-foto-profile";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_media_foto_profil_pengguna: 5, // > 0
    key_foto: "/media-pengguna-profil-foto/1/beb930f8df96abb3c63bcc34-pto.jpg", // tidak kosong
  });

  const resBenar = http.del(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200 / 204": (r) => r.status === 200 || r.status === 204,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_pengguna
    id_media_foto_profil_pengguna: 0, // <= 0
    key_foto: "",                     // string kosong
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