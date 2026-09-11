// k6 run alamat/masukan_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,              // jumlah virtual user
  iterations: 1,      // lama tes
};

// MasukanAlamatPengguna:

// Skema Benar: 	Nomor Telfon harus berisikan atleast 10-13 digit
// 		nama provinsi terdaftar
// 		nama kota terdaftar
// 		kode negara harus IDN
// 		kode pos harus 5 satuan

// Skema Salah: 	Nomor Telfon tidak berisikan atleast 10 - 13 digit atau lebih 
// 		nama provinsi tidak terdaftar
// 		nama kota tidak terdaftar
// 		kode negara tidak IDN
// 		Kode Pos tidak berisikan 5 satuan digit

// skemabenar: *, skemasalah: *,


export default function () {
  let url = "http://localhost:8080/user/alamat/membuat-alamat";

  let payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "anan29837@gmail.com",
    },
    panggilan_alamat: "Rumah Saya",
    nomor_telefon: "0812847928",
    nama_alamat: "Jalan Melati No. 7",
    provinsi: "jawa_timur",
    kota:     "bandung",
    kode_pos: "40123",
    kode_negara: "IDN",
    deskripsi: "Rumah utama buat kirim barang",
    longitude: 108.6098,
    latitude: -7.9147,
  });

  let payloadSalah = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "anan29837@gmail.com",
    },
    panggilan_alamat: "Rumah Saya",
    nomor_telefon: "081284798", // disini hanya 9
    nama_alamat: "Jalan Melati No. 7",
    provinsi: "jawa_timussr", //tak terdaftar 
    kota:     "bandungs", //tak terdaftar
    kode_pos: "401232", // lebih dari 5 
    kode_negara: "ID", // tak IDN
    deskripsi: "Rumah utama buat kirim barang",
    longitude: 108.6098,
    latitude: -7.9147,
  })

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

   const resBenar = http.post(url, payloadBenar, params);
    const resSalah = http.post(url, payloadSalah, params)
  
    try {
      console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
      console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2))
    } catch {
      console.log(resBenar.body);
      console.log(resSalah.body)
    }
}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "MasukanAlamatPengguna",
//   "pesan": "Berhasil",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "MasukanAlamatPengguna",
//   "pesan": "Gagal format kode pos tidak valid",
//   "response_payload": null
// }  source=console