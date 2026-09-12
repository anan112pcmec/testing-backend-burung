// k6 run /auth/login.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

// SellerLogin:
// Skema Benar: 	email harus mengandung @gmail.com
// password harus memiliki setidaknya 1 angka, huruf kapital, dan karakter khusus unik

export default function () {
  const url = 'http://localhost:8080/auth/seller/login';

 
   const payloadBenar = JSON.stringify({
     email: 'ananlol156@gmail.com',
     password_hash: 'ApparelNikeSecure@2025',
   });
 
   const payloadSalah = JSON.stringify({
     email: 'ananlol156@gmail.com',
     password_hash: 'ApparelNikeSecure2025', //password disini tidak memiliki karakter unik
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
     console.log(resSalah.body);
   }

}


// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "SellerLogin",
//   "pesan": "",
//   "response_payload": {
//     "status_login_seller": "Berhasil",
//     "pesan_login_seller": "Kamu berhasil login NIKE, kembangkan koneksimu dan raih keuntungan di sini!",
//     "id": 1,
//     "nama": "NIKE",
//     "username": "1nikereal_"
//   }
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "SellerLogin",
//   "pesan": "Password harus mengandung angka/underscore dan minimal 1 huruf kapital",
//   "response_payload": null
// }  source=console