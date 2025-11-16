// k6 run barang/likes_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  duration: "15s",       // durasi test
};

export default function () {
  const url = "http://localhost:8080/user/barang/likes-barang";

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_induk_likes: 2,     // ⚠️ ganti sesuai ID barang
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "Status 200": (r) => r.status === 200,
    "Body tidak kosong": (r) => r.body && r.body.length > 0,
  });

  console.log(res.body)

}
