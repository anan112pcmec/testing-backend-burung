// k6 run alamat/masukan_alamat.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// MasukanAlamatKurir:

// Skema Benar:   Menyertakan Identitas Kurir
//                NomorTelephone harus berisikan setidaknya 10-13 digit
//                Provinsi terdaftar
//                Kota terdaftar
//                KodeNegara harus IDN
//                KodePos harus 5 digit

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                NomorTelephone kurang dari 10 atau lebih dari 13 digit
//                Provinsi tidak terdaftar
//                Kota tidak terdaftar
//                KodeNegara bukan IDN
//                KodePos tidak berisikan 5 digit

export default function () {
  const url = 'http://localhost:8080/kurir/alamat/masukan-alamat';
  

  /* ===============================
     1️⃣ SKEMA BENAR
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    panggilan_alamat: "Rumah",
    nomor_telephone: "081234567890", // 12 digit (10-13 digit)
    nama_alamat: "Alamat Utama",
    provinsi: "dki_jakarta",          // Terdaftar
    kota: "jakarta timur",           // Terdaftar
    kode_negara: "IDN",              // IDN
    kode_pos: "12345",               // 5 digit
    deskripsi: "Alamat utama kurir",
    longtitude: 106.84513,
    latitude: -6.21462,
  });




  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    panggilan_alamat: "Rumah",
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

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

    const resBenar = http.post(url, payloadBenar, params);


  const resSalah = http.post(url, payloadSalah, params);

  check(resBenar, {
    "skema benar status 200/201": (r) => r.status === 200 || r.status === 201,
  });

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