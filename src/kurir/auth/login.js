// k6 run auth/login.js
import http from 'k6/http';

export let options  = {
    vus: 1,         // jumlah virtual user
    iterations: 1,  // deterministic
}

// KurirLogin:

// Skema Benar: 	email memiliki karakter @gmail.com
// 		password setidaknya memiliki 1 angka dan 1 karakter unik
// dan kurang dari 10 karakter dan 1 huruf kapital

// Skema Salah: 	email tidak memiliki karakter @gmail.com
// 		password tidak memiliki 1 setidaknya angka atau 1 karakter unik
// dan kurang dari 10 karakter atau 1 huruf kapital


export default function(){

    const url = "http://localhost:8080/auth/kurir/login"

    const payloadBenar = JSON.stringify({
        email: "ananlol156@gmail.com",
        password_hash: "Bismillah_$13"
    })

    const payloadSalah = JSON.stringify({
        email: "ananlol", // salah tak ada @gmail.com
        password_hash: "bismillah" // salah tak ada huruf kapital atau angka atau simbol unik
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
     
       sleep(1);
}