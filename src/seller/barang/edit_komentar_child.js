// k6 run barang/edit_komentar_child.js
import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi load test
export const options = {
  vus: 1, // jumlah virtual users
  duration: "15s", // durasi test
};

export default function () {
  const url = "http://localhost:8080/seller/komentar-child/edit";

  // Data JSON sesuai struct PayloadEditChildKomentar
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: 2,
    komentar_child_komentar: "komentanya",
  });

  // Header request
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Kirim request POST
  const res = http.patch(url, payload, params);

  // Validasi respons
  check(res, {
    "status 200 OK": (r) => r.status === 200,
    "response time < 1s": (r) => r.timings.duration < 1000,
  });

  console.log(res.body);

  sleep(1);
}
