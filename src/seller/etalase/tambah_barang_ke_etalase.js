// k6 run etalase/tambah_barang_ke_etalase.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "http://localhost:8080/seller/etalase/tambah-barang-ke-etalase";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_etalase: 1,        // ganti sesuai ID etalase tujuan
    id_barang_induk: 2,  // ganti sesuai ID barang induk yang ingin ditambahkan
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

}
