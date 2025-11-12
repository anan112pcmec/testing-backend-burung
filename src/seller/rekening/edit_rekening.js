import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,           // jumlah virtual users
  duration: "30s",   // durasi tes
};

export default function () {
  const url = "http://localhost:8080/seller/rekening/edit-rekening"; // ganti kalau port beda

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_rekening: 12990,            // ID rekening yang mau diupdate
    nama_bank: "BCA",
    nomor_rekening: "9876543210",
    pemilik_rekening: "Faiz Hannan Hakim",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(url, payload, { headers });

  check(res, {
    "status 200": (r) => r.status === 200,
    "response valid": (r) =>
      r.body && r.body.includes("Rekening") || r.body.includes("berhasil"),
  });

   console.log(`Response: ${res.body}`);

}
