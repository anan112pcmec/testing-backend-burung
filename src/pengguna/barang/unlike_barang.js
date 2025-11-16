// k6 run barang/unlike_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 5,               // jumlah virtual user
  duration: "20s",      // durasi test
};

const BASE_URL = "http://localhost:8080/user/barang/unlikes-barang"; // GANTI sesuai servermu

export default function () {
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_disukai: 1,
    id_barang_induk: 2,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(
    BASE_URL,
    payload,
    { headers }
  );

  check(res, {
    "Status 200 OK": (r) => r.status === 200,
    "Ada response / payload": (r) => r.body.length > 0,
  });

  console.log(res.body);

}
