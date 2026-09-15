// k6 run rekening/set_default_rekening.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/rekening/set-default-rekening";

  // Skema Benar:
  // - id_rekening tidak lebih kecil dari 0 (misal: 12994)
  // - Menyertakan identitas seller yang valid
  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_rekening: 12994,
  });

  // Skema Salah:
  // - id_rekening lebih kecil dari 0 (misal: -1)
  // - Tidak menyertakan identitas seller (null)
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    id_rekening: -1,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.patch(url, payloadBenar, params);
  const resSalah = http.patch(url, payloadSalah, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  check(resSalah, {
    "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
  });

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log("Respon Benar: ", resBenar.body);
    console.log("Respon Salah: ", resSalah.body);
  }

  sleep(1);
}