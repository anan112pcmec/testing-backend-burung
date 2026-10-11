// k6 run informasi/edit_informasi_kurir.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// EditInformasiDataKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdInformasiKurir lebih besar dari 0
//                TanggalLahir berformat string YYYY-MM-DD (ymd)

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdInformasiKurir lebih kecil atau sama dengan 0
//                TanggalLahir tidak berformat string ymd

export default function () {
  const url = 'http://localhost:8080/kurir/informasi/edit-informasi-kurir';
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
    id_informasi_kurir: 1,       // > 0
    tanggal_lahir: "1998-05-20", // Berformat YYYY-MM-DD (ymd)
    alasan: "Perubahan informasi kurir untuk pembaruan data.",
    informasi_ktp: true,
    informasi_sim: true,
  });

  const resBenar = http.patch(url, payloadBenar, params);

  check(resBenar, {
    "skema benar status 200": (r) => r.status === 200,
  });

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    id_informasi_kurir: 0,       // <= 0
    tanggal_lahir: "20-05-1998", // Format salah (bukan ymd) atau kosong
    alasan: "",
    informasi_ktp: false,
    informasi_sim: false,
  });

  const resSalah = http.patch(url, payloadSalah, params);

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