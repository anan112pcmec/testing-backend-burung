// k6 run profiling/general_profiling.js
import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,          // jumlah virtual users
  duration: "15s",  // durasi test
};

export default function () {
  const url = "http://localhost:8080/seller/profiling/info-general-update"; // ganti sesuai endpoint kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_jam_operasional_seller: "08:00 - 17:00",
    update_punchline_seller: "Egila Laper Banget",
    update_deskripsi_seller: "Kami menyediakan berbagai produk unggulan dari UMKM lokal.",
    update_dedication_seller: "Elektronik & Gadget",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  check(res, {
    "status 200 (OK)": (r) => r.status === 200,
    "status 404 (Not Found)": (r) => r.status === 404,
    "status 500 (Server Error)": (r) => r.status === 500,
  });
}
