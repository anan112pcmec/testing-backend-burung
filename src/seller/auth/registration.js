// k6 run /auth/registration.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

// {
// PreSellerRegistration:

// Skema Benar: 	email harus mengandung @gmail.com
// 		username harus mengandung setidaknya 1 angka dan underscore
// 		password harus memiliki setidaknya 1 angka, huruf kapital, dan karakter khusus unik

// Skema Salah: 	email tidak mengandung @gmail.com
// 		username tidak mengandung setidaknya 1 angka atau underscore
// 		password tidak memiliki setidaknya 1 anggka atau huruf kapital atau karakter khusus unik

// skemabenar: *, skemasalah:*,
// }


export default function () {
  const url = 'http://localhost:8080/auth/seller/registration';

  const payloadBenar = JSON.stringify({
    username: '1nikereal_',
    nama: 'NIKE',
    email: 'ananlol156@gmail.com',
    jenis: 'Personal',
    seller_dedication: 'Pakaian & Fashion',
    password_hash: 'ApparelNikeSecure@2025',
  });

  const payloadSalah = JSON.stringify({
    username: "1adidasreal", // tidak ada underscore 
    nama: "ADIDAS",
    email: 'ananlol156gmail.com', // tidak ada @gmail.com
    jenis: 'Personal',
    seller_dedication: 'Pakaian & Fashion',
    password_hash: "ApparelAdidas"
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

  

  sleep(1);
}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "PreSellerRegistration",
//   "pesan": "",
//   "response_payload": {
//     "status_pre_registrasi_seller": "Berhasil",
//     "pesan_pre_registrasi_seller": "Silahkan Masukan Kode OTP yang sudah dikirimkan ke Gmail Anda"
//   }
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "PreSellerRegistration",
//   "pesan": "Kredensial Tidak Valid",
//   "response_payload": null
// }  source=console