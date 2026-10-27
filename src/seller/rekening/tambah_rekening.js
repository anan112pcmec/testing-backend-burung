// k6 run rekening/tambah_rekening.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/seller/credential/tambah-rekening";

  // Skema Benar:
  // - Menyertakan identitas seller
  // - Nama bank terdaftar ("bni")
  // - Nomor rekening 10-15 digit dan semuanya angka ("123456789012" -> 12 digit)
  // - Pemilik rekening setidaknya 5 karakter ("Anan Apparel" -> 12 karakter)
  let payloadBenar = JSON.stringify({
  identitas_seller: {
    id_seller: 1,
    username_seller: "1nikereal_",
    email_seller: "anan29837@gmail.com",
  },
  nama_bank: "bri",
  nomor_rekening: "034101000123508",
  pemilik_rekening: "Anan Apparel",
});

  // Skema Salah:
  // - Tidak menyertakan identitas seller (atau kosong/null)
  // - Nama bank tidak terdaftar ("bank_ngawur")
  // - Nomor rekening kurang dari 10 digit / mengandung huruf ("123")
  // - Pemilik rekening kurang dari 3 karakter ("An" -> 2 karakter)
  let payloadSalah = JSON.stringify({
    identitas_seller: null,
    nama_bank: "bank_ngawur",
    nomor_rekening: "123",
    pemilik_rekening: "An",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.post(url, payloadBenar, params);
  const resSalah = http.post(url, payloadSalah, params);

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