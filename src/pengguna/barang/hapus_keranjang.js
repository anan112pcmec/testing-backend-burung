// k6 run barang/hapus_keranjang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "1s",  // lama test
};

export default function () {
  const url = "http://localhost:8080/user/barang/keranjang-barang/hapus"; // GANTI sesuai server

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_keranjang: 1 // GANTI sesuai ID keranjang yang ingin dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer TOKEN_JIKA_PAKAI_AUTH"
    },
  };

  const res = http.del(url, payload, params);

  check(res, {
    "status 200 / 204": (r) => r.status === 200 || r.status === 204,
    "response exists": (r) => r.body !== null,
  });

  console.log(res.body);

  sleep(1);
}
