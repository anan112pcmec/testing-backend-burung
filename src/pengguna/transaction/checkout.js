// k6 run transaction/checkout.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// Checkout Barang:

// Skema Benar:   Menyertakan Identitas Pengguna
//                Dalam setiap DataCheckout:
//                  - IdKeranjang > 0
//                  - IdPengguna > 0
//                  - IdSeller > 0
//                  - IdBarangInduk > 0
//                  - IdKategoriBarang > 0
//                  - JumlahKeranjang > 0
//                  - StatusKeranjang === "Ready"
//                Jenis Layanan Kurir diantara: "reguler", "express", atau "instant"

// Skema Salah:   Tidak Menyertakan Identitas Pengguna
//                Dalam salah satu DataCheckout:
//                  - ID <= 0
//                  - JumlahKeranjang <= 0
//                  - StatusKeranjang !== "Ready"
//                Jenis Layanan Kurir tidak diantara "reguler", "express", atau "instant"

export default function () {
  const url = 'http://localhost:8080/user/transaksi/checkout-barang';
  const params = {
    headers: {
      'Content-Type': 'application/json',
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
    data_checkout: [
      {
        id_keranjang: 9,                           // > 0
        id_pengguna_keranjang: 1,                  // > 0
        id_seller_barang_induk_keranjang: 1,       // > 0
        id_barang_induk_keranjang: 6,              // > 0
        id_kategori_barang_keranjang: 14,          // > 0
        jumlah_keranjang: 10,                      // > 0
        status_keranjang: "Ready",                 // Harus "Ready"
      },
    ],
    jenis_layanan_kurir_checkout_barang: "reguler", // "reguler" | "express" | "instant"
  });

  const resBenar = http.post(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200/201": (r) => r.status === 200 || r.status === 201,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_pengguna
    data_checkout: [
      {
        id_keranjang: 0,                           // <= 0
        id_pengguna_keranjang: -1,                 // <= 0
        id_seller_barang_induk_keranjang: 0,       // <= 0
        id_barang_induk_keranjang: 0,              // <= 0
        id_kategori_barang_keranjang: 0,           // <= 0
        jumlah_keranjang: 0,                       // <= 0
        status_keranjang: "Pending",               // !== "Ready"
      },
    ],
    jenis_layanan_kurir_checkout_barang: "sameday", // Bukan reguler/express/instant
  });

  const resSalah = http.post(url, payloadSalah, params);

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