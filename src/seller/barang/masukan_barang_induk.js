// k6 run barang/masukan_barang_induk.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100,
  duration: "10s",
};

export default function () {
  const url = "http://localhost:8080/seller/masukan_barang"; // sesuaikan port/backend kamu

 const payload = JSON.stringify({
  identitas_seller: {
    id_seller: 1,
    username_seller: 'ananapparel',
    email_seller: 'anan29837@gmail.com',
  },
  data_barang_induk: {
    id_seller: 1,
    nama: "Kaos Oversize Premium",
    jenis: "Semua Barang",
    deskripsi: "Kaos oversize bahan cotton combed 30s, adem dan nyaman.",
    original_kategori: 1,
    harga_kategori_barang: 95000,
  },
  data_kategori_barang_induk: [
    {
      id_seller_kategori_barang: 10,
      id_barang_induk_kategori: 10,
      id_alamat_gudang_kategori_barang: 6,
      id_rekening_kategori_barang: 12994,
      nama_kategori_barang: "Kaos Oversize Hitam L",
      deskripsi_kategori_barang: "Kaos hitam oversize size L bahan cotton combed.",
      warna_kategori_barang: "Hitam",
      stok_kategori_barang: 120,
      harga_kategori_barang: 95000,
      berat_gram_kategori_barang: 200,
      dimensi_panjang_cm_kategori_barang: 30,
      dimensi_tinggi_cm_kategori_barang: 2,
      sku_kategori: "TS-BLK-OV-L",
      is_original_kategori_barang: true,
    }
  ],
  id_alamat_gudang: 6,
  id_rekening: 1,
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
}
