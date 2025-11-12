import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual users
  duration: "1s",  // durasi pengujian
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
      id_seller_barang_induk: 1,
      nama_barang_induk: "Kemeja Pria Slim Fit",
      jenis_barang_induk: "Pakaian & Fashion",
      deskripsi_barang_induk: "Kemeja pria slim fit bahan katun lembut nyaman dipakai.",
      original_kategori: 1,
      harga_kategori_barang: 250000,
    },
    data_kategori_barang_induk: [
      {
        id_seller_kategori_barang: 1,
        id_barang_induk_kategori: 1,
        id_alamat_gudang_kategori_barang: 2,
        id_rekening_kategori_barang: 3,
        nama_kategori_barang: "Kemeja Hitam Lengan Panjang",
        deskripsi_kategori_barang: "Ukuran L warna hitam bahan katun.",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 120,
        harga_kategori_barang: 250000,
        berat_gram_kategori_barang: 350,
        dimensi_panjang_cm_kategori_barang: 30,
        dimensi_tinggi_cm_kategori_barang: 2,
        sku_kategori: "KMJ-HIT-L",
        is_original_kategori_barang: true,
      },
      {
        id_seller_kategori_barang: 1,
        id_barang_induk_kategori: 1,
        id_alamat_gudang_kategori_barang: 2,
        id_rekening_kategori_barang: 3,
        nama_kategori_barang: "Kemeja Putih Lengan Pendek",
        deskripsi_kategori_barang: "Ukuran M warna putih bahan linen.",
        warna_kategori_barang: "Putih",
        stok_kategori_barang: 80,
        harga_kategori_barang: 220000,
        berat_gram_kategori_barang: 330,
        dimensi_panjang_cm_kategori_barang: 30,
        dimensi_tinggi_cm_kategori_barang: 2,
        sku_kategori: "KMJ-PUT-M",
        is_original_kategori_barang: false,
      }
    ],
    id_alamat_gudang: 4,
    id_rekening: 12994,
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
