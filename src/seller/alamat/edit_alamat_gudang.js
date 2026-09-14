// k6 run alamat/edit_alamat_gudang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,             // jumlah virtual user
  iterations: 1,      // lama tes
};

// EditAlamatGudang:
// Skema Benar:   Menyertakan id_alamat_gudang > 0
//   Nomor Telephone hanya berisikan angka saja dan dalam jangkauan 11-13 karakter
//   provinsi terdaftar
//   kota terdaftar
//   kode_pos terdaftar (5 digit)
//   kode_negara harus "IDN"
//   menyertakan identitas seller

// Skema Salah:   Tidak menyertakan id_alamat_gudang atau id_alamat_gudang <= 0
//   Nomor Telephone tidak berisikan angka saja atau tidak 11-13 karakter
//   provinsi tidak terdaftar
//   kota tidak terdaftar
//   kode_pos tidak terdaftar
//   kode_negara selain "IDN"
//   tidak menyertakan identitas

export default function () {
  let url = "http://localhost:8080/seller/alamat/edit-alamat-gudang";

  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_alamat_gudang: 1,
    panggilan_alamat: "Gudang Satu",
    nomor_telefon: "081289707890", // angka saja, 12 karakter
    nama_alamat: "Gudang Pusat Anan Apparel Indonesia",
    provinsi: "banten",
    kota: "serang",
    kode_pos: "42111", // contoh kode pos terdaftar valid
    kode_negara: "IDN",
    deskripsi: "Perubahan alamat gudang pusat untuk optimalisasi distribusi dan penyimpanan barang.",
    longitude: 105.682,
    latitude: -6.21,
  });

  let payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_alamat_gudang: 0, // tidak lebih besar dari 0 / tidak valid
    panggilan_alamat: "Gudang Satu",
    nomor_telefon: "+62 812-8970-7890", // mengandung simbol/karakter selain angka
    nama_alamat: "Gudang Pusat Anan Apparel Indonesia",
    provinsi: "bantens", // tidak terdaftar
    kota: "serangs", // tidak terdaftar
    kode_pos: "99999", // tidak terdaftar
    kode_negara: "ID", // bukan IDN
    deskripsi: "Perubahan alamat gudang pusat untuk optimalisasi distribusi dan penyimpanan barang.",
    longitude: 105.682,
    latitude: -6.21,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.patch(url, payloadBenar, params);
  const resSalah = http.patch(url, payloadSalah, params);

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
//   "service": "EditAlamatGudang",
//   "pesan": "Berhasil",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "EditAlamatGudang",
//   "pesan": "Gagal id alamat gudang tidak valid",
//   "response_payload": null
// }  source=console