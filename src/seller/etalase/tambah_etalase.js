// k6 run etalase/tambah_etalase.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "5s",
};

export default function () {
  const url = "http://localhost:8080/seller/etalase/tambah-etalase"; // path asli sesuai backend

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama: "Etalase Baju Modis",
    deksripsi: "Etalase khusus untuk semua produk Baju premium.",
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
