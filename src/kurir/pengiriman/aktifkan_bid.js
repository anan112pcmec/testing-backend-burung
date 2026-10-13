// k6 run pengiriman/aktifkan_bid.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// AktifkanBidKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                JenisPengiriman di antara "Reguler", "Instant", "Express"
//                Mode di antara "auto" atau "manual"
//                Provinsi valid (misal: "dki_jakarta")
//                Kota valid (misal: "jakarta barat")

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                JenisPengiriman tidak di antara Reguler/Instant/Express
//                Mode tidak di antara Auto/Manual
//                Provinsi tidak valid
//                Kota tidak valid

export default function () {
  const url = 'http://localhost:8080/kurir/pengiriman/aktifkan-bid';
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
      id_kurir: 3,
      username_kurir: "kurir_db1b0b65",
      email_kurir: "ananlol156@gmail.com",
    },
    jenis_pengiriman: "Reguler",       // Valid (Reguler/Instant/Express)
    mode: "manual",                   // Valid (auto/manual)
    provinsi: "dki_jakarta",          // Valid
    kota: "jakarta barat",            // Valid
    is_ekspedisi: true,
    alamat: "Jl. Meruya Selatan No. 12",
    longitude: 106.7438,
    latitude: -6.2019,
    max_kg: 15,
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
    jenis_pengiriman: "InvalidType",  // Tidak valid
    mode: "invalid_mode",             // Tidak valid
    provinsi: "",                     // Tidak valid
    kota: "",                         // Tidak valid
    is_ekspedisi: false,
    alamat: "",
    longitude: 0,
    latitude: 0,
    max_kg: 0,
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