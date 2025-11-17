// k6 run wishlist/hapus_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "1s",  // lama test
};

export default function () {
  const url = "http://localhost:8080/user/wishlist/hapus-barang"; // ganti sesuai server

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_wishlist: 1,      // ganti sesuai wishlist ID
    id_barang_induk: 2   // ganti sesuai barang
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
