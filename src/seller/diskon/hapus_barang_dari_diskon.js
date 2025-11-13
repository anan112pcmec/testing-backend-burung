// k6 run diskon/hapus_barang_dari_diskon.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "http://localhost:8080/seller/diskon/hapus-diskon-barang";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_barang_di_diskon: 3, // ganti sesuai ID barang yang ingin dihapus dari diskon
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.del(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

  sleep(1);
}
