import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/seller/masukan_barang';

   const payloads = [
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Bola Voli Mikasa EREN",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Bola voli resmi dengan kualitas turnamen",
      tanggal_rilis_barang_induk: "2025-09-11",
      original_kategori: "Kuning"
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Kuning",
        deskripsi_kategori_barang: "Bola voli outdoor dan indoor EREN",
        warna_kategori_barang: "Kuning",
        stok_kategori_barang: 30,
        harga_kategori_barang: 350000,
        berat_gram_kategori_barang: 450,
        dimensi_panjang_cm_kategori_barang: 22,
        dimensi_tinggi_cm_kategori_barang: 22,
        sku_kategori: "BV-001"
      }
    ]
  }),
   ];


    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    for (let i = 0; i < payloads.length; i++) {
        const res = http.post(url, payloads[i], params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(`Barang ${i + 1} → Status: ${res.status}`);
        console.log(`Barang ${i + 1} → Body: ${res.body}`);

    }

}