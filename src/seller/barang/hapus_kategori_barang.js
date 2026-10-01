// k6 run barang/hapus_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// HapusKategori:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBarangInduk lebih besar dari 0
//                IdKategoriBarang lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBarangInduk lebih kecil atau sama dengan 0
//                IdKategoriBarang lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/seller/hapus_kategori_barang';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_barang_induk: 2,     // > 0
    id_kategori_barang: 6,  // > 0
  });

  const resBenar = http.del(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_barang_induk: 0,      // <= 0
    id_kategori_barang: -1,  // <= 0
  });

  const resSalah = http.del(url, payloadSalah, params);

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