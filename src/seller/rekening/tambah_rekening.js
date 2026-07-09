// k6 run rekening/tambah_rekening.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
};

export default function () {
  const url = "http://localhost:8080/seller/credential/tambah-rekening";

  const payload = JSON.stringify({
    identitas_seller: {
    id_seller: 8,
    username_seller: "ananapparel",
    email_seller: "appburung@gmail.com",
  },
    nama_bank: "bni",
    nomor_rekening: "2838237832",
    pemilik_rekening: "Anan Apparel Indonesia Admin4",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  console.log(`Response: ${res.body}`);
  sleep(1)
}
