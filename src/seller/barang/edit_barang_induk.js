// k6 run barang/edit_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// EditBarangInduk:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBarangInduk tak boleh lebih kecil atau sama dengan 0
//                Nama Barang tak boleh kurang dari 5 karakter
//                Jenis Barang harus Valid Terdaftar

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBarangInduk lebih kecil atau sama dengan 0
//                Nama Barang Induk kurang dari 5 karakter
//                Jenis Barang Tidak Valid Terdaftar

export default function () {
  const url = "http://localhost:8080/seller/edit_barang";
  const params = {
    headers: {
      "Content-Type": "application/json",
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
    id_barang_induk: 1,                 // > 0
    nama_barang: "Kemeja Polos",        // >= 5 karakter
    jenis_barang: "Pakaian & Fashion",  // Jenis valid terdaftar
    deskripsi: "untuk foto wisuda.",
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
    id_barang_induk: 0,                 // <= 0
    nama_barang: "Baju",                // < 5 karakter
    jenis_barang: "JenisInvalid123",    // Jenis tidak terdaftar
    deskripsi: "Deskripsi salah",
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