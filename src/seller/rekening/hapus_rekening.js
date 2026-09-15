// k6 run rekening/hapus_rekening.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/credential/hapus-rekening";

  // Skema Benar:
  // - id_rekening tidak lebih kecil dari 0 (misal: 12990)
  // - nomor rekening 10-15 digit dan semuanya berupa angka ("9876543210" -> 10 digit)
  // - Menyertakan identitas seller yang valid
  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_rekening: 12990,
    nomor_rekening_hapus_rekening: "9876543210",
  });

  // Skema Salah:
  // - id_rekening lebih kecil dari 0 (misal: -1)
  // - nomor rekening tidak memiliki digit antara 10-15 atau mengandung karakter/huruf ("123")
  // - Tidak menyertakan identitas seller (null)
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    id_rekening: -1,
    nomor_rekening_hapus_rekening: "123",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Catatan: Pada k6, method http.del mendukung body jika dikirim melalui objek params.
  const resBenar = http.del(url, payloadBenar, params);
  const resSalah = http.del(url, payloadSalah, params);

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