import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,          // jumlah virtual users (VU)
  duration: "30s",  // durasi uji beban
};

export default function () {
  const url = "http://localhost:8080/seller/rekening/set-default-rekening"; // sesuaikan endpoint Go kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_rekening: 12994,          // rekening yang mau dijadikan default
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(url, payload, { headers });

  check(res, {
    "status 200": (r) => r.status === 200,
    "tidak gagal": (r) => !r.body.includes("Gagal"),
    "response valid": (r) =>
      r.body.includes("berhasil") || r.body.includes("default"),
  });

  console.log(`Response: ${res.body}`);
}
