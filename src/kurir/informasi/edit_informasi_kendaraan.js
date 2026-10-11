// k6 run informasi/edit_informasi_kendaraan.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// EditInformasiDataKendaraan:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdInformasiKendaraan lebih besar dari 0
//                JenisKendaraan diantara (Motor, Mobil, Truk, Pickup, Lainnya, Unknown)
//                NamaKendaraan minimal 1 karakter
//                RodaKendaraan diantara (2, 3, 4)

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdInformasiKendaraan lebih kecil atau sama dengan 0
//                JenisKendaraan tidak diantara pilihan valid
//                NamaKendaraan kosong ("")
//                RodaKendaraan selain 2, 3, atau 4

export default function () {
  const url = 'http://localhost:8080/kurir/informasi/edit-informasi-kendaraan';
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
    id_informasi_kendaraan: 1,      // > 0
    jenis_kendaraan: "Motor",       // Diantara (Motor, Mobil, Truk, Pickup, Lainnya, Unknown)
    nama_kendaraan: "Honda Vario",  // Minimal 1 karakter
    roda_kendaraan: 2,              // Diantara 2, 3, 4
    informasi_stnk: true,
    informasi_bpkb: false,
    nomor_rangka: "MH12ABCD1234567",
    nomor_mesin: "EN987654321",
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
    id_informasi_kendaraan: 0,      // <= 0
    jenis_kendaraan: "Kereta",      // Tidak diantara pilihan valid
    nama_kendaraan: "",             // Kosong (string kosong)
    roda_kendaraan: 10,             // Selain 2, 3, atau 4
    informasi_stnk: false,
    informasi_bpkb: false,
    nomor_rangka: "",
    nomor_mesin: "",
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