import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,          // jumlah virtual users
  duration: "30s",  // durasi uji beban
};

export default function () {
  const url = "http://localhost:8080/seller/credential/hapus-rekening"; // ganti port sesuai server kamu

  const payload = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_rekening: 12990,          // ID rekening yang mau dihapus
    nomor_rekening_hapus_rekening: "9876543210", // nomor rekening yang dihapus
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.del(url, payload, { headers });

  check(res, {
    "status 200": (r) => r.status === 200,
    "tidak gagal": (r) => !r.body.includes("Gagal"),
    "response valid": (r) =>
      r.body.includes("berhasil") || r.body.includes("Rekening"),
  });

  
  console.log(`Response: ${res.body}`);

}
