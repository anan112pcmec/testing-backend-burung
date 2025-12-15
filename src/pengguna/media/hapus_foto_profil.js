// k6 run media/hapus_foto_profil.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "15s", // lama test
};

export default function () {
  const url = "http://localhost:8080/user/media/hapus-foto-profile"; // ganti kalau beda

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_media_foto_profil_pengguna: 5,
    key_foto:"/media-pengguna-profil-foto/1/beb930f8df96abb3c63bcc34-pto.jpg"  // GANTI sesuai id komentar yg mau dihapus
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
