// k6 run barang/hapus_komen
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "15s", // lama test
};

export default function () {
  const url = "http://localhost:8080/user/barang/komentar-barang/hapus"; // ganti kalau beda

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_komentar_hapus_komentar: 1147  // GANTI sesuai id komentar yg mau dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
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
