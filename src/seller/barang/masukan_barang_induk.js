// k6 run barang/masukan_barang_induk.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "7s",
};

export default function () {
  const url = "http://localhost:8080/seller/masukan_barang"; // sesuaikan port/backend kamu

 const payload = JSON.stringify({
  identitas_seller: {
    id_seller: 8,
    username_seller: "ananapparel",
    email_seller: "appburung@gmail.com",
  },
  data_barang_induk: {
    id_seller: 8,
    nama: "Kaos Oversize Premium",
    jenis: "Semua Barang",
    deskripsi: "Kaos oversize bahan cotton combed 30s, adem dan nyaman.",
    original_kategori: 1,
    harga_kategori_barang: 95000,
  },
  data_kategori_barang_induk: [
    {
      id_seller_kategori_barang: -99,
      id_barang_induk_kategori: 0,
      id_alamat_gudang_kategori_barang: 999999,
      id_rekening_kategori_barang: 12994,
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
    {
      id_seller_kategori_barang: 0,
      id_barang_induk_kategori: -1,
      id_alamat_gudang_kategori_barang: 888888,
      id_rekening_kategori_barang: 12994,
      nama_kategori_barang: "Kaos Oversize Charcoal M",
      deskripsi_kategori_barang: "Kaos charcoal oversize size M bahan cotton combed.",
      warna_kategori_barang: "Charcoal",
      stok_kategori_barang: 60,
      harga_kategori_barang: 95000,
      berat_gram_kategori_barang: 180,
      dimensi_panjang_cm_kategori_barang: 28,
      dimensi_tinggi_cm_kategori_barang: 2,
      sku_kategori: "TS-CHC-OV-M",
      is_original_kategori_barang: false,
    },
  ],
  id_alamat_gudang: 1,
  id_rekening: 2,
});

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    "status 200": (r) => r.status === 200,
    "tidak error parsing": (r) => !r.body.includes("Gagal parsing"),
    "barang berhasil dimasukkan": (r) => r.body.includes("berhasil") || r.status === 200,
  });

  console.log(`Response: ${res.body}`);
  sleep(1);
}
