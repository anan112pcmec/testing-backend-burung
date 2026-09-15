// k6 run rekening/edit_rekening.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/rekening/edit-rekening";

  // Skema Benar:
  // - id_rekening tidak lebih kecil dari 0 (misal: 12990)
  // - Menyertakan identitas seller yang valid
  // - Nama bank terdaftar ("bca")
  // - Nomor rekening 10-15 digit berupa angka ("9876543210" -> 10 digit)
  // - Pemilik rekening minimal 5 karakter ("Faiz Hannan Hakim" -> 17 karakter)
  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_rekening: 12990,
    nama_bank: "bca",
    nomor_rekening: "9876543210",
    pemilik_rekening: "Faiz Hannan Hakim",
  });

  // Skema Salah:
  // - id_rekening lebih kecil dari 0 (misal: -1)
  // - Tidak menyertakan identitas seller (null)
  // - Nama bank tidak terdaftar ("bank_ngawur")
  // - Nomor rekening tidak 10-15 digit atau mengandung karakter/huruf ("123")
  // - Pemilik rekening kurang dari 3 karakter ("Fa" -> 2 karakter)
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    id_rekening: -1,
    nama_bank: "bank_ngawur",
    nomor_rekening: "123",
    pemilik_rekening: "Fa",
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