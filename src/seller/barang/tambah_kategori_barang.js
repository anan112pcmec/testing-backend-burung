// k6 run barang/tambah_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // jumlah virtual users
  duration: '1s', // durasi test
};

export default function () {
  const url = 'http://localhost:8080/seller/tambah_kategori_barang'; // sesuaikan endpoint

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
      id_seller_kategori_barang: -55,
      id_barang_induk_kategori: 9999,
      id_alamat_gudang_kategori_barang: 0,
      id_rekening_kategori_barang: 12994,
      nama_kategori_barang: "Kaos Oversize Denim Blue L",
      deskripsi_kategori_barang: "Kaos denim blue oversize size L bahan cotton combed.",
      warna_kategori_barang: "Denim Blue",
      stok_kategori_barang: 70,
      harga_kategori_barang: 95000,
      berat_gram_kategori_barang: 200,
      dimensi_panjang_cm_kategori_barang: 30,
      dimensi_tinggi_cm_kategori_barang: 2,
      sku_kategori: "TS-DNM-OV-L",
      is_original_kategori_barang: false,
    },
    {
      id_seller_kategori_barang: 777777,
      id_barang_induk_kategori: -5,
      id_alamat_gudang_kategori_barang: -1,
      id_rekening_kategori_barang: 12994,
      nama_kategori_barang: "Kaos Oversize Mustard S",
      deskripsi_kategori_barang: "Kaos mustard oversize size S bahan cotton combed.",
      warna_kategori_barang: "Mustard",
      stok_kategori_barang: 85,
      harga_kategori_barang: 95000,
      berat_gram_kategori_barang: 170,
      dimensi_panjang_cm_kategori_barang: 26,
      dimensi_tinggi_cm_kategori_barang: 2,
      sku_kategori: "TS-MSTD-OV-S",
      is_original_kategori_barang: false,
    },
  ],
  id_alamat_gudang: 1,
  id_rekening: 2,
});

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status code 200': (r) => r.status === 200,
    'response has success': (r) => r.body.includes('success') || r.body.includes('berhasil'),
  });

  sleep(1);
  console.log(`Response: ${res.body}`);
}
