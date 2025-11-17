// k6 run barang/masukan_child_komen.js
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  http.asyncRequest(
    "POST",
    "http://localhost:8080/user/barang/komentar-child/tambah",
    JSON.stringify({
      identitas_pengguna: {
        id_pengguna: 1,
        username_pengguna: "ananlol",
        email_pengguna: "ananlol156@gmail.com",
      },
      id_komentar_masukan_komentar: 1148,
      komentar_masukan_komentar: "ini komentar child woy",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  sleep(1);
}
