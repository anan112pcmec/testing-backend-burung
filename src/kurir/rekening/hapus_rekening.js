// k6 run rekening/hapus_rekening.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// HapusRekeningKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdRekening lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdRekening lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/kurir/rekening/hapus-rekening';
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
      email_kurir: "faizbaru@mail.com",
      username_kurir: "faizkurirbaru",
    },
    id_rekening: 1, // > 0
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
    id_rekening: 0, // <= 0
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