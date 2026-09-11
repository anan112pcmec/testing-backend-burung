// k6 run auth/registration.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,           // jumlah virtual user
  iterations: 1,  // lama test
};

// * = berhasil
// - = gagal
// Catatan Keberhasilan Service Pengguna:
// {
// Skema Benar: 	
//    username harus memiliki setidaknya 1 angka

// 		email harus memiliki @gmail.com 

// 		password harus memiliki 1 angka dan underscore juga 		harus ada 1 huruf kapital

// Skema Salah: 	
//    username tidak memiliki setidaknya 1 angka

// 		email tidak memiliki @gmail.com

// 		password tidak memiliki 1 angka dan underscore dan 1 		huruf kapital

// PreUserRegistration: skemabenar: , skemasalah: 


export default function () {
  const url = 'http://localhost:8080/auth/user/registration';

  const payloadBenar = JSON.stringify({
    username: 'ananlolanjay11',
    nama: "Faiz Hannan Hakim",
    email: "anan29837@gmail.com",
    password_hash: "Bismillah_13",
    pin_hash: '9822',
    status: '',
  })

  const payloadSalah = JSON.stringify({
    username: 'anancuy',
    nama: 'Faiz Hannan Hakim',
    email: 'anan29837',
    password_hash: 'rahasiadeh2',
    pin_hash: '',
    status: '',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
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

//   INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "PreUserRegistration",
//   "pesan": "",
//   "response_payload": {
//     "status_pre_registrasi_user": "Berhasil",
//     "pesan_pre_registrasi_user": "Silahkan Masukan Kode OTP yang sudah di kirimkan ke Gmail Anda"
//   }
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "PreUserRegistration",
//   "pesan": "Kredensial Tidak Valid",
//   "response_payload": null
// }  source=consol

}
