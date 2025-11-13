// k6 run diskon/hapus_diskon.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10, // jumlah virtual users
  duration: "15s", // durasi test
};

export default function () {
  const url = "http://localhost:8080/seller/diskon/hapus-diskon";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_diskon_produk: 1, // ubah sesuai ID diskon yang ingin dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.del(url, payload, params);

  check(res, {
    "status code 200": (r) => r.status === 200,
    "response not empty": (r) => r.body.length > 0,
  });

  console.log(res.body);
}
