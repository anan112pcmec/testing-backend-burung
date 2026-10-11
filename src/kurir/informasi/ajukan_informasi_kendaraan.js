// k6 run informasi/ajukan_informasi_kendaraan.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// InformasiDataKendaraan:

// Skema Benar:   Menyertakan Identitas Kurir
//                JenisKendaraan diantara (Motor, Mobil, Truk, Pickup, Lainnya, Unknown)
//                NamaKendaraan minimal 1 karakter
//                RodaKendaraan diantara (2, 3, 4)

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                JenisKendaraan tidak diantara pilihan valid
//                NamaKendaraan kosong ("")
//                RodaKendaraan selain 2, 3, atau 4

export default function () {
  const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kendaraan';
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
    jenis_kendaraan: "Motor",       // Diantara (Motor, Mobil, Truk, Pickup, Lainnya, Unknown)
    nama_kendaraan: "Honda Beat",   // Minimal 1 karakter
    roda_kendaraan: 2,              // Diantara 2, 3, 4 (sesuaikan format angka/string tipe backend)
    informasi_stnk: true,
    informasi_bpkb: false,
    nomor_rangka: "MH12ABCD1234567",
    nomor_mesin: "EN987654321",
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
    jenis_kendaraan: "Kereta",      // Tidak diantara pilihan valid
    nama_kendaraan: "",             // Kosong (string kosong)
    roda_kendaraan: 10,             // Selain 2, 3, atau 4
    informasi_stnk: false,
    informasi_bpkb: false,
    nomor_rangka: "",
    nomor_mesin: "",
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