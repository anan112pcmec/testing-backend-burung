// k6 run pengiriman/ambil_pengiriman_manual_non_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// AmbilPengirimanNonEks:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdPengiriman lebih besar dari 0
//                IdBid lebih besar dari 0
//                JenisPengiriman di antara "Reguler", "Express", "Instant"

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdPengiriman lebih kecil atau sama dengan 0
//                IdBid lebih kecil atau sama dengan 0
//                JenisPengiriman tidak di antara Reguler/Express/Instant

export default function () {
  const url = 'http://localhost:8080/kurir/pengiriman/ambil-pengiriman-manual-non-eks';
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
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    id_pengiriman: 2,       // > 0
    id_bid: 1,              // > 0
    jenis_pengiriman: "Reguler", // Di antara Reguler/Express/Instant
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
    id_pengiriman: 0,       // <= 0
    id_bid: 0,              // <= 0
    jenis_pengiriman: "InvalidType", // Tidak valid
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