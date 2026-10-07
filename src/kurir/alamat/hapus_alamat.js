// k6 run alamat/hapus_alamat.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// HapusAlamatKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdAlamatKurir lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdAlamatKurir lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/kurir/alamat/hapus-alamat';
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
      username_kurir: "kurir_310f2592",
    },
    id_alamat_kurir: 1, // > 0
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
    id_alamat_kurir: 0,  // <= 0
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