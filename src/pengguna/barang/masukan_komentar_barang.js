// k6 run barang/masukan_komentar_barang.js
import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  vus: 1,      // jumlah virtual user
  duration: "1s", // durasi test
};

export default function () {
  const url = "http://localhost:8080/user/barang/komentar-barang/tambah"; // GANTI dengan URL lu

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_induk_masukan_komentar: 2,   // ganti
    komentar_masukan_komentar: "Barang ini bagus banget!" // ganti
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response not empty": (r) => r.body.length > 0,
  });

  console.log(res.body)
  sleep(1)

}
