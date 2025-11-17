// k6 run transaction/batal_checkout.js
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 1,       // jumlah virtual user
  duration: "1s" // lama test
};

export default function () {
  const url = "http://localhost:8080/user/transaksi/batal-checkout-barang";

  const payload = JSON.stringify({
    pesan_chekout_barang: "Batalkan checkout",
    data_response_checkout_barang: [
      {
        id_user_barang_keranjang: 1,
        id_seller_barang_keranjang: 1,
        nama_seller_barang_keranjang: "Faiz Apparel",
        jenis_barang_keranjang: "Pakaian & Fashion",
        id_barang_induk_keranjang: 2,
        id_kategori_barang_keranjang: 4,
        nama_barang_keranjang: "Kemeja Pria Slim Fit",
        nama_kategori_barang_keranjang: "Kemeja Putih Lengan Pendek",
        harga_barang_kategori_keranjang: 220000,
        dipesan_barang_keranjang: 30,
        status_barang_keranjang: true,
        pesan_data_keranjang: "Barang siap dibatalkan checkout."
      }
    ],
    data_layanan_pengiriman_barang: {
      jenis_layanan_kurir_keranjang: "reguler"
    }
  });

  const params = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = http.del(url, payload, params);

  check(res, {
    "status 200": r => r.status === 200,
    "response ada payload": r => r.body.length > 2
  });


  console.log(res.body);

  sleep(1);
}
