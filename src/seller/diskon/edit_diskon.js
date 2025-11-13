// k6 run diskon/edit_diskon.js
import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1, // jumlah virtual user
  duration: "5s", // lama pengujian
};

export default function () {
  const url = "http://localhost:8080/seller/diskon/edit-diskon";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_diskon_produk: 1,
    nama: "Diskon Spesial Akhir Tahun",
    deksripsi: "Update promo akhir tahun untuk semua produk burung premium.",
    diskon_persen: 30,
    berlaku_mulai: "2025-11-13T00:00:00Z",
    berlaku_sampai: "2025-12-31T00:00:00Z"
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response not empty": (r) => r.body && r.body.length > 0,
  });

  console.log(res.body);
}
