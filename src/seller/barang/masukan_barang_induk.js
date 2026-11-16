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
    id_seller: 1,
    username_seller: "1nikereal_",
    email_seller: "appburung@gmail.com",
  },
  data_barang_induk: {
    id_seller: 8,
    nama: "Sepatu Sneakers Casual", // >= 5 karakter
    jenis: "Semua Barang",         // Jenis valid
    deskripsi: "Sepatu sneakers kasual dengan bahan mesh breathable dan sol empuk.",
    original_kategori: 1,
    harga_kategori_barang: 350000,
  },
  data_kategori_barang_induk: [
    {
      id_seller_kategori_barang: 8,
      id_barang_induk_kategori: 0,
      id_alamat_gudang_kategori_barang: 1,
      id_rekening_kategori_barang: 2,
      nama_kategori_barang: "Sepatu Sneakers Putih Size 42",
      deskripsi_kategori_barang: "Sepatu sneakers warna putih ukuran 42.",
      warna_kategori_barang: "#FFFFFF", // Kode HEX valid untuk Putih
      stok_kategori_barang: 15,
      harga_kategori_barang: 350000,
      berat_gram_kategori_barang: 700,
      dimensi_panjang_cm_kategori_barang: 32,
      dimensi_lebar_cm_kategori_barang: 20,
      sku_kategori: "SNP-WHT-42",
      is_original_kategori_barang: true,
    },
    {
      id_seller_kategori_barang: 8,
      id_barang_induk_kategori: 0,
      id_alamat_gudang_kategori_barang: 1,
      id_rekening_kategori_barang: 2,
      nama_kategori_barang: "Sepatu Sneakers Hitam Size 41",
      deskripsi_kategori_barang: "Sepatu sneakers warna hitam ukuran 41.",
      warna_kategori_barang: "#000000", // Kode HEX valid untuk Hitam
      stok_kategori_barang: 20,
      harga_kategori_barang: 350000,
      berat_gram_kategori_barang: 680,
      dimensi_panjang_cm_kategori_barang: 32,
      dimensi_lebar_cm_kategori_barang: 20,
      sku_kategori: "SNP-BLK-41",
      is_original_kategori_barang: false,
    },
  ],
  id_alamat_gudang: 2, // > 0
  id_rekening: 1,      // > 0
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