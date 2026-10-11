// k6 run informasi/ajukan_informasi_kurir.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// InformasiDataKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                TanggalLahir berformat string YYYY-MM-DD (ymd)

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                TanggalLahir tidak berformat string ymd (misal: format salah atau string kosong)

export default function () {
  const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kurir';
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
      id_kurir: 3,
      username_kurir: "kurir_db1b0b65",
      email_kurir: "ananlol156@gmail.com",
    },
    tanggal_lahir: "1998-05-20", // Berformat YYYY-MM-DD (ymd)
    alasan: "Melengkapi data kurir untuk keperluan verifikasi.",
    informasi_ktp: true,
    informasi_sim: false,
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
    tanggal_lahir: "20-05-1998", // Format salah (bukan YYYY-MM-DD) atau string kosong
    alasan: "",
    informasi_ktp: false,
    informasi_sim: false,
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