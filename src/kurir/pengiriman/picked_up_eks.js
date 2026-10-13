// k6 run pengiriman/picked_up_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// PickedUpPengirimanEks:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdBidKurir lebih besar dari 0
//                IdPengirimanEks lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdBidKurir lebih kecil atau sama dengan 0
//                IdPengirimanEks lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/kurir/pengiriman/picked-up-pengiriman-eks';
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
    id_bid_kurir: 3,                  // Valid (> 0)
    id_pengiriman: 7,                 // Valid (> 0) → IdPengirimanEks
    lokasi: "Jakarta Timur",
    keterangan: "Paket ekspedisi telah di-pickup",
    latitude: -6.2115,
    longitude: 106.8461,
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
    id_bid_kurir: 0,                  // Tidak valid (<= 0)
    id_pengiriman: 0,                 // Tidak valid (<= 0) → IdPengirimanEks
    lokasi: "Jakarta Timur",
    keterangan: "Paket ekspedisi telah di-pickup",
    latitude: -6.2115,
    longitude: 106.8461,
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