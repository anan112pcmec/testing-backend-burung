// k6 run transaction/checkout.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,           // jumlah virtual user
  duration: "1s",   // lama tes
};



export default function () {
  const url = "http://localhost:8080/user/transaksi/checkout-barang"; // GANTI sesuai server-mu

  const payload = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    data_checkout: [
      {
        id_keranjang: 9,
        id_pengguna_keranjang: 1,
        id_seller_barang_induk_keranjang: 1,
        id_barang_induk_keranjang: 6,
        id_kategori_barang_keranjang: 14,
        jumlah_keranjang: 10,
        status_keranjang: "Ready",
      }
    ],
    jenis_layanan_kurir_checkout_barang: "reguler"
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    "status 200/201": (r) => r.status === 200 || r.status === 201,
    "response valid": (r) => r.body.length > 0,
  });
  console.log(res.body);
  sleep(1);
}
