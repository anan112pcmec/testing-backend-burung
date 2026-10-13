// k6 run pengiriman/update_informasi_pengiriman.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// UpdateInformasiPengiriman:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdPengiriman lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdPengiriman lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/kurir/pengiriman/update-informasi-pengiriman';
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
    id_pengiriman: 1,                 // Valid (> 0)
    lokasi: "Jakarta Pusat",
    keterangan: "Tadi macet jadi saya neduh bentar le",
    latitude: -6.1862,
    longitude: 106.8283,
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
    id_pengiriman: 0,                 // Tidak valid (<= 0)
    lokasi: "Jakarta Pusat",
    keterangan: "Tadi macet jadi saya neduh bentar le",
    latitude: -6.1862,
    longitude: 106.8283,
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