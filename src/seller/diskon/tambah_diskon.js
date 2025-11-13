// k6 run diskon/tambah_diskon.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1, // jumlah virtual user
  duration: "5s", // lama pengujian
};

export default function () {
  const url = "http://localhost:8080/seller/diskon/tambah-diskon";

  const payload = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    nama: "Diskon Musim Panas",
    deksripsi: "Potongan harga besar untuk semua produk burung hias.",
    diskon_persen: 20,
    berlaku_mulai: "2025-11-13T00:00:00Z",
    berlaku_sampai: "2025-12-13T00:00:00Z"
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response not empty": (r) => r.body && r.body.length > 0,
  });

  console.log(res.body);

}
