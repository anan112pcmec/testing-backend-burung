// k6 run barang/masukan_barang_induk.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
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
    id_seller_barang_induk: 2,
    nama_barang_induk: "Jaket Hoodie Basic",
    jenis_barang_induk: "Semua Barang",
    deskripsi_barang_induk: "Hoodie basic bahan fleece premium, lembut dan hangat.",
    original_kategori: 1,
    harga_kategori_barang: 180000,
  },
  data_kategori_barang_induk: [
    {
      id_seller_kategori_barang: 2,
      id_barang_induk_kategori: 2,
      id_alamat_gudang_kategori_barang: 6,   // tidak diubah
      id_rekening_kategori_barang: 12994,    // tidak diubah
      nama_kategori_barang: "Hoodie Hitam Size L",
      deskripsi_kategori_barang: "Hoodie warna hitam size L bahan fleece.",
      warna_kategori_barang: "Hitam",
      stok_kategori_barang: 70,
      harga_kategori_barang: 180000,
      berat_gram_kategori_barang: 500,
      dimensi_panjang_cm_kategori_barang: 35,
      dimensi_tinggi_cm_kategori_barang: 4,
      sku_kategori: "HD-BLK-L",
      is_original_kategori_barang: true,
    },
    {
      id_seller_kategori_barang: 2,
      id_barang_induk_kategori: 2,
      id_alamat_gudang_kategori_barang: 6,   // tidak diubah
      id_rekening_kategori_barang: 12994,    // tidak diubah
      nama_kategori_barang: "Hoodie Abu Size M",
      deskripsi_kategori_barang: "Hoodie warna abu size M bahan fleece.",
      warna_kategori_barang: "Abu-abu",
      stok_kategori_barang: 55,
      harga_kategori_barang: 175000,
      berat_gram_kategori_barang: 480,
      dimensi_panjang_cm_kategori_barang: 35,
      dimensi_tinggi_cm_kategori_barang: 4,
      sku_kategori: "HD-GRY-M",
      is_original_kategori_barang: false,
    }
  ],
  id_alamat_gudang: 6,   // tidak diubah
  id_rekening: 12994,    // tidak diubah
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

  sleep(1);
  console.log(`Response: ${res.body}`);
}
