// k6 run barang/edit_keranjang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "http://localhost:8080/user/barang/keranjang-barang/edit"; // GANTI sesuai server

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_keranjang: 6,       // ID keranjang yang mau di-edit
    id_barang_induk: 5,    // GANTI sesuai barang
    id_kategori_barang: 12, // GANTI sesuai kategori
    jumlah_di_keranjang: 1990   // GANTI sesuai jumlah baru
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer TOKEN_JIKA_PAKAI_AUTH"
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "status 200 / 201": (r) => r.status === 200 || r.status === 201,
    "response exists": (r) => r.body !== null,
  });

  console.log(res.body);
  sleep(1);
}
