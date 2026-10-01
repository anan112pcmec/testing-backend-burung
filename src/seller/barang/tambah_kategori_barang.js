// k6 run barang/tambah_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// TambahKategori:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBarangInduk lebih besar dari 0
//                Kategori Barang (yang disebutkan wajib ada): (Nama minimal 5 karakter, Warna berisikan hexa, Harga lebih besar dari 200, Berat Gram, DimensiPanjang, DimensiLebar tak boleh lebih kecil atau sama dengan 0, Sku)
//                IdAlamatGudang lebih besar dari 0
//                IdRekening Lebih besar dari 0

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBarangInduk lebih kecil atau sama dengan 0
//                Kategori Barang(yang disebutkan salah satu tidak ada): (Nama minimal 5 karakter, Warna berisikan hexa, Harga, Berat Gram, DimensiPanjang, DimensiLebar, Sku)
//                IdAlamatGudang lebih kecil atau sama dengan 0
//                IdRekening lebih kecil atau sama dengan 0

export default function () {
  const url = 'http://localhost:8080/seller/tambah_kategori_barang';
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
      id_seller: 8,
      username_seller: "ananapparel",
      email_seller: "appburung@gmail.com",
    },
    id_barang_induk: 1, // > 0
    data_kategori_barang_induk: [
      {
        nama_kategori_barang: "Kaos Oversize Denim Blue L", // >= 5 karakter
        warna_kategori_barang: "#1A2B3C",                  // Hexa color
        harga_kategori_barang: 95000,                       // > 200
        berat_gram_kategori_barang: 200,                    // > 0
        dimensi_panjang_cm_kategori_barang: 30,             // > 0
        dimensi_lebar_cm_kategori_barang: 20,               // > 0
        sku_kategori: "TS-DNM-OV-L",                        // Sku
        stok_kategori_barang: 70,
        deskripsi_kategori_barang: "Kaos denim blue oversize size L bahan cotton combed.",
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
    id_barang_induk: 0, // <= 0
    data_kategori_barang_induk: [
      {
        nama_kategori_barang: "Kaos",      // < 5 karakter
        warna_kategori_barang: "Red",      // Bukan format Hexa
        harga_kategori_barang: 150,        // <= 200
        berat_gram_kategori_barang: 0,     // <= 0
        dimensi_panjang_cm_kategori_barang: -1, // <= 0
        dimensi_lebar_cm_kategori_barang: 0,    // <= 0
        // sku_kategori tidak disertakan
      },
    ],
    id_alamat_gudang: 0, // <= 0
    id_rekening: -1,     // <= 0
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