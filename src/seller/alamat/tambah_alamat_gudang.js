// k6 run alamat/tambah_alamat_gudang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,             // jumlah virtual user
  iterations: 1,      // lama tes
};

// TambahAlamatGudang:
// Skema Benar:   Nomor Telephone hanya berisikan angka saja dan dalam jangkauan 11-13 karakter
//   provinsi terdaftar
//   kota terdaftar
//   kode_pos terdaftar (5 digit)
//   kode_negara harus "IDN"
//   menyertakan identitas seller

// Skema Salah:   Nomor Telephone tidak berisikan angka saja atau tidak 11-13 karakter
//   provinsi tidak terdaftar
//   kota tidak terdaftar
//   kode_pos tidak terdaftar
//   kode_negara selain "IDN"
//   tidak menyertakan identitas (atau identitas kosong/tidak valid)

export default function () {
  let url = "http://localhost:8080/seller/alamat/tambah-alamat-gudang";

  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 8,
      username_seller: "ananapparel",
      email_seller: "appburung@gmail.com",
    },
    panggilan_alamat: "Gudang Surabaya",
    nomor_telefon: "081234567890", // angka saja, 12 karakter
    nama_alamat: "Suroboyo rek",
    provinsi: "jawa_timur",
    kota: "surabaya",
    kode_pos: "60271", // contoh kode pos terdaftar valid
    kode_negara: "IDN",
    deskripsi: "Gudang utama penyimpanan stok barang dan pengiriman domestik.",
    longitude: 112.75083,
    latitude: -7.24917,
  });

  let payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 8,
      username_seller: "ananapparel",
      email_seller: "appburung@gmail.com",
    },
    panggilan_alamat: "Gudang Surabaya",
    nomor_telefon: "+62 812-3456-7890", // mengandung simbol/karakter selain angka atau panjang tidak sesuai
    nama_alamat: "Suroboyo rek",
    provinsi: "jawa_timussr", // tidak terdaftar
    kota: "surabayas", // tidak terdaftar
    kode_pos: "99999", // tidak terdaftar
    kode_negara: "ID", // bukan IDN
    deskripsi: "Gudang utama penyimpanan stok barang dan pengiriman domestik.",
    longitude: 112.75083,
    latitude: -7.24917,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.post(url, payloadBenar, params);
  const resSalah = http.post(url, payloadSalah, params);

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log(resBenar.body);
    console.log(resSalah.body);
  }
}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "TambahAlamatGudang",
//   "pesan": "Berhasil",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "TambahAlamatGudang",
//   "pesan": "Gagal nomor telefon tidak valid",
//   "response_payload": null
// }  source=console