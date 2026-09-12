// k6 run /auth/registration_validate.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

// ValidateSellerRegistration:
// Skema Benar: 	otp berisikan pas 8 satuan 
// 		otp tidak mengandung karakter selain angka

// Skema Salah: 	otp tidak berisikan pas 8 satuan 
// 		otp mengandung karakter selain angka

// skemabenar: *, skemasalah: *,


export default function () {
  const url = 'http://localhost:8080/auth/seller/registration/validate';

  const payloadBenar = JSON.stringify({
    otp_key: '84136226', // ganti sesuai OTP yang kamu pakai
  });

  const payloadSalah = JSON.stringify({
    otp_key: "8729192" //tidak pas 8 karakter
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


}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "ValidateSellerRegistration",
//   "pesan": "",
//   "response_payload": {
//     "status_validasi_seller": "Berhasil",
//     "pesan_validasi_seller": "Berhasil, Akun mu sudah terdaftar dan Kamu Siap Berjualan Bersama Kami"
//   }
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "ValidateSellerRegistration",
//   "pesan": "Gagal otp tidak valid",
//   "response_payload": null
// }  source=console
