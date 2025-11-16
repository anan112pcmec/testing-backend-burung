// k6 run alamat/hapus_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,              // jumlah virtual user
  duration: "10s",      // durasi test
};

export default function () {
  const url = "http://localhost:8080/user/alamat/hapus-alamat";

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_alamat_hapus_alamat: 1,   // ⚠️ GANTI sesuai ID alamat yang mau dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.del(url, payload, params);

  check(res, {
    "Status harus 200": (r) => r.status === 200,
    "Response tidak kosong": (r) => r.body && r.body.length > 0,
  });

  console.log(res.body);

}
