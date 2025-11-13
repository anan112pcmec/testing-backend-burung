// k6 run barang/hapus_child_komentar.js
import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi simulasi
export const options = {
  vus: 1, // jumlah virtual users
  duration: "15s", // durasi tes
};

export default function () {
  const url = "http://localhost:8080/seller/komentar-child/hapus";

  // Payload sesuai struct PayloadHapusChildKomentar
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: 2,
  });

  // Header HTTP
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Kirim permintaan POST ke endpoint
  const res = http.del(url, payload, params);

  // Cek hasil respons
  check(res, {
    "status 200 OK": (r) => r.status === 200,
    "response time < 1s": (r) => r.timings.duration < 1000,
  });

}
