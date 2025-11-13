// k6 run diskon/masukan_barang_ke_diskon.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "http://localhost:8080/seller/diskon/masukan-barang";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_diskon_produk: 1, // ganti sesuai ID diskon yang ingin diterapkan
    id_barang_induk: 2, // ganti sesuai ID barang induk
    id_kategori_barang: 3, // ganti sesuai ID kategori barang
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

  sleep(1);
}
