// k6 run auth/validate_registration.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

// PreUserRegistration:
// Skema Benar: 	username harus memiliki setidaknya 1 angka

// 		email harus memiliki @gmail.com 

// 		password harus memiliki 1 angka dan underscore juga harus ada 1 huruf kapital

// Skema Salah: 	username tidak memiliki setidaknya 1 angka

// 		email tidak memiliki @gmail.com

// 		password tidak memiliki 1 angka dan underscore dan 1 huruf kapital

// skemabenar: * , skemasalah: *

export default function () {
  const url = 'http://localhost:8080/auth/user/registration/validate';

  const payloadBenar = JSON.stringify({
    otp_key:  '15415835', // ganti sesuai OTP yang kamu pakai
  });
  const payloadSalah = JSON.stringify({
    otp_key: "jcd92n92"
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resBenar = http.post(url, payloadBenar, params);
  const resSalah = http.post(url, payloadSalah, params)

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log(resBenar.body);
    console.log(resSalah.body)
  }

  // INFO[0000] Skema Benar:  {
  //   "status": 404,
  //   "service": "ValidateUserRegistration",
  //   "pesan": "",
  //   "response_payload": {
  //     "status_validasi_user": "",
  //     "pesan_validasi_user": "Gagal Kode Sudah Expired, Coba Registrasi Ulang"
  //   }
  // }  source=console
  // INFO[0000] Skema Salah:  {
  //   "status": 401,
  //   "service": "ValidateUserRegistration",
  //   "pesan": "Gagal otp tidak valid",
  //   "response_payload": null
  // }  source=console

  sleep(1);
}
