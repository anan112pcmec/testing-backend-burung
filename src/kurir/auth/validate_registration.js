// k6 run auth/validate_registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// alidateKurirRegistration:

// Skema Benar:	OTPkey berisikan 8 karakter, hanya berisikan angka

// Skema Salah: 	OTPkey tidak berisikan 8 karakter pas atau hanya beri

export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration/validate';

  const payloadBenar = JSON.stringify({
    otp_key: "86541715",
  });

  const payloadSalah = JSON.stringify({
    otp_key: "027192", // salah otp key tak tepat 8 karakter
  })

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
}
