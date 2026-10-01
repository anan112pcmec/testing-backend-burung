// k6 run barang/edit_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// EditKategori:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBarangInduk lebih besar dari 0
//                IdKategoriBarang lebih besar dari 0
//                Nama lebih dari 5 karakter
//                Warna berupa hexa
//                BeratGram
//                DimensiPanjang
//                DimensiLebar
//                Sku tak boleh kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBarangInduk lebih kecil atau sama dengan 0
//                IdKategoriBarang lebih kecil atau sama dengan 0
//                Nama kurang dari 5 karakter
//                Warna tak berupa hexa
//                BeratGram kosong
//                Dimensi Panjang kosong
//                DimensiLebar Ksong
//                Sku Kosong

export default function () {
  const url = 'http://localhost:8080/seller/edit_kategori_barang';
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
    id_barang_induk_edit_kategori: 2, // > 0
    id_kategori_barang: 6,            // > 0
    nama: "Kemeja Linen Super",       // > 5 karakter
    deskripsi: "Kemeja linen dengan kualitas premium, ringan, dan nyaman untuk cuaca tropis.",
    warna: "#006699",                 // Format hexa
    berat_gram: 250,                  // Terisi
    dimensi_panjang: 29,              // Terisi
    dimensi_lebar: 19,                // Terisi
    sku: "KMJ-LNN-BRLT-03",           // Tidak kosong
  });

  const resBenar = http.patch(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_barang_induk_edit_kategori: 0, // <= 0
    id_kategori_barang: -1,           // <= 0
    nama: "Baju",                     // < 5 karakter
    warna: "Biru Laut",               // Bukan format hexa
    // berat_gram kosong
    // dimensi_panjang kosong
    // dimensi_lebar kosong
    sku: "",                          // Kosong
  });

  const resSalah = http.patch(url, payloadSalah, params);

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