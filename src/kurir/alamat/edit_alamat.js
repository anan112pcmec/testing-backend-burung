// k6 run alamat/edit_alamat.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// EditAlamatKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdAlamatKurir lebih besar dari 0
//                NomorTelephone harus berisikan setidaknya 10-13 digit
//                Provinsi terdaftar
//                Kota terdaftar
//                KodeNegara harus IDN
//                KodePos harus 5 digit

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdAlamatKurir lebih kecil atau sama dengan 0
//                NomorTelephone kurang dari 10 atau lebih dari 13 digit
//                Provinsi tidak terdaftar
//                NamaKota tidak terdaftar
//                KodeNegara bukan IDN
//                KodePos tidak berisikan 5 digit

export default function () {
  const url = 'http://localhost:8080/kurir/alamat/edit-alamat';
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
    id_alamat_kurir: 2,              // > 0
    panggilan_alamat: "1Edited Rumah",
    nomor_telephone: "081234567890", // 12 digit (10-13 digit)
    nama_alamat: "Alamat Utama",
    provinsi: "dki_jakarta",          // Terdaftar
    kota: "jakarta barat",           // Terdaftar
    kode_negara: "IDN",              // IDN
    kode_pos: "12345",               // 5 digit
    deskripsi: "Alamat utama kurir",
    longtitude: 106.84513,
    latitude: -6.21462,
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
    id_alamat_kurir: 0,                   // <= 0
    panggilan_alamat: "1Edited Rumah",
    nomor_telephone: "08123",             // Kurang dari 10 digit
    nama_alamat: "Alamat Utama",
    provinsi: "provinsi_fiktif",          // Tidak terdaftar
    kota: "kota_fiktif",                  // Tidak terdaftar
    kode_negara: "USA",                   // Bukan IDN
    kode_pos: "123",                      // Bukan 5 digit
    deskripsi: "Alamat utama kurir",
    longtitude: 106.84513,
    latitude: -6.21462,
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