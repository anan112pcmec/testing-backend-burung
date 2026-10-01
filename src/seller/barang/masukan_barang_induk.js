// k6 run barang/masukan_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// MasukanBarangInduk:

// Skema Benar:   Menyertakan Identitas seller
//                Menyertakan BarangInduk(yang disebut wajib ada): NamaBarang minimal 5 karakter, JenisBarang harus valid terdaftar
//                IdAlamatGudang tak boleh kurang atau sama dengan 0
//                IdRekening tak Boleh kurang atau sama dengan 0

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                Tidak Menyertakan BarangInduk(atau attribute tidak ada): NamaBarang kurang dari 5 karakter, Jenis Barang tidak valid terdaftar
//                IdAlamatGudang kurang atau sama dengan 0
//                IdRekening kurang atau sama dengan 0

export default function () {
  const url = "http://localhost:8080/seller/masukan_barang";
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
      id_seller: 8,
      username_seller: "ananapparel",
      email_seller: "appburung@gmail.com",
    },
    data_barang_induk: {
      id_seller: 8,
      nama: "Kaos Oversize Premium", // >= 5 karakter
      jenis: "Semua Barang",          // Jenis valid
      deskripsi: "Kaos oversize bahan cotton combed 30s, adem dan nyaman.",
      original_kategori: 1,
      harga_kategori_barang: 95000,
    },
    data_kategori_barang_induk: [
      {
        id_seller_kategori_barang: 8,
        id_barang_induk_kategori: 0,
        id_alamat_gudang_kategori_barang: 1,
        id_rekening_kategori_barang: 2,
        nama_kategori_barang: "Kaos Oversize Maroon XL",
        deskripsi_kategori_barang: "Kaos maroon oversize size XL bahan cotton combed.",
        warna_kategori_barang: "Maroon",
        stok_kategori_barang: 40,
        harga_kategori_barang: 95000,
        berat_gram_kategori_barang: 220,
        dimensi_panjang_cm_kategori_barang: 32,
        dimensi_tinggi_cm_kategori_barang: 2,
        sku_kategori: "TS-MRN-OV-XL",
        is_original_kategori_barang: false,
      },
    ],
    id_alamat_gudang: 1, // > 0
    id_rekening: 2,      // > 0
  });

  const resBenar = http.post(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    data_barang_induk: {
      id_seller: 8,
      nama: "Kaos",              // < 5 karakter
      jenis: "JenisInvalid123",  // Jenis tidak terdaftar
      deskripsi: "Deskripsi",
      original_kategori: 1,
      harga_kategori_barang: 95000,
    },
    id_alamat_gudang: 0,         // <= 0
    id_rekening: -1,             // <= 0
  });

  const resSalah = http.post(url, payloadSalah, params);

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