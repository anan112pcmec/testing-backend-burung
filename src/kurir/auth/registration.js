// k6 run auth/registration.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// PreKurirRegistration:

// Skema Benar:	email memiliki karakter @gmail.com
// 		username memiliki setidaknya 1 angka dan underscore
// 		password setidaknya memiliki 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital

// Skema Salah:	email tidak memiliki @gmail.com
// 		username tidak memiliki setidaknya 1 angka atau underscore
// 		password tidak memiliki setidaknya 1 angka atau 1 karakter unik atau kurang dari 10 karakter atau 1 huruf kapital


export default function () {
  const url = 'http://localhost:8080/auth/kurir/registration';

  const payloadBenar = JSON.stringify({
    nama: `andhi`,
    email: `ananlol156@gmail.com`,
    password_hash: "Password12345_$2",
    username: `Abangkuabangcelek_`
  });

   const payloadSalah = JSON.stringify({
    nama: `andhi`,
    email: `ananlol156@gmai`, // salah tak ada @gmail.com
    password_hash: "password12345", // saalah tak ada simbol unik dan huruf kapital
    username: `Abangkuabangcelek` // salah tak ada underscore
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
