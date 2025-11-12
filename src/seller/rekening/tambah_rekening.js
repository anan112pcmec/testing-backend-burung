import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "3s",
};

export default function () {
  const url = "http://localhost:8080/seller/credential/tambah-rekening";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    nama_bank: "Bri",
    nomor_rekening: "1372893",
    pemilik_rekening: "Anan Apparel Indonesia",
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
  sleep(1);
}
