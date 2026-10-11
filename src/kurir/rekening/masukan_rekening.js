// k6 run rekening/masukan_rekening.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// MasukanRekeningKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                Bank harus terdaftar (misal: "bca", "bri", "mandiri")
//                Nomor rekening memiliki panjang 10 hingga 15 digit dan seluruhnya berupa angka
//                Pemilik rekening setidaknya berisikan 5 karakter

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                Bank tidak terdaftar
//                Nomor rekening kurang dari 10 digit, lebih dari 15 digit, atau mengandung non-angka
//                Pemilik rekening kurang dari 5 karakter

export default function () {
  const url = 'http://localhost:8080/kurir/rekening/masukan-rekening';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    nama_bank: "bca",                 // Terdaftar
    nomor_rekening: "123456789028",   // 12 digit angka (antara 10-15 digit)
    pemilik_rekening: "Kurir Dua",    // >= 5 karakter
  });

  const resBenar = http.post(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200/201": (r) => r.status === 200 || r.status === 201,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    nama_bank: "BankFiktif",          // Tidak terdaftar
    nomor_rekening: "123",            // Kurang dari 10 digit
    pemilik_rekening: "Kur",          // < 5 karakter
  });

  const resSalah = http.post(url, payloadSalah, params);

  check(resSalah, {
    "skema salah ditolak (bukan 200/201)": (r) => r.status !== 200 && r.status !== 201,
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