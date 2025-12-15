// k6 run media/hapus_foto_profil.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "15s", // lama test /media_seller_profil_foto/1/ddf9c747ebbf22bc69f06ab1-pto.jpg
};

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-profile"; // ganti kalau beda

  const payload = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_seller_profil_foto: 1,
    key_foto:"/media_seller_profil_foto/1/ddf9c747ebbf22bc69f06ab1-pto.jpg"  // GANTI sesuai id komentar yg mau dihapus
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
