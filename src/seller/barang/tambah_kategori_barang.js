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
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_barang_induk_tambah_kategori: 2, // contoh id barang induk
    tambah_kategori_barang: [
      {
        id_kategori_barang: 1,
        id_seller_kategori_barang: 101,
        id_barang_induk_kategori: 12,
        id_alamat_gudang_kategori_barang: 3,
        id_rekening_kategori_barang: 4,
        nama_kategori_barang: "Kemeja Flanel Lengan Panjang",
        deskripsi_kategori_barang: "Kemeja flanel premium dengan bahan lembut dan hangat, cocok untuk gaya kasual.",
        warna_kategori_barang: "Merah Hitam",
        stok_kategori_barang: 120,
        harga_kategori_barang: 175000,
        berat_gram_kategori_barang: 450,
        dimensi_panjang_cm_kategori_barang: 30,
        dimensi_tinggi_cm_kategori_barang: 20,
        sku_kategori: "KMJ-FLN-MRH-01",
        is_original_kategori_barang: true
      },
      {
        id_kategori_barang: 0,
        id_seller_kategori_barang: 101,
        id_barang_induk_kategori: 12,
        id_alamat_gudang_kategori_barang: 3,
        id_rekening_kategori_barang: 4,
        nama_kategori_barang: "Kemeja Linen Lengan Pendek",
        deskripsi_kategori_barang: "Kemeja linen adem dan ringan, cocok untuk aktivitas santai di luar ruangan.",
        warna_kategori_barang: "Putih",
        stok_kategori_barang: 80,
        harga_kategori_barang: 155000,
        berat_gram_kategori_barang: 350,
        dimensi_panjang_cm_kategori_barang: 28,
        dimensi_tinggi_cm_kategori_barang: 18,
        sku_kategori: "KMJ-LNN-PTH-02",
        is_original_kategori_barang: true
      }
    ],
    id_alamat_gudang: 4,
    id_rekening: 12985,
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
