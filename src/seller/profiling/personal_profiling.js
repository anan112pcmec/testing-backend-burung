// k6 run profiling/personal_profiling.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual user (bisa kamu ubah)
  iterations: 1 // durasi pengujian
};

export default function () {
  const url = 'http://localhost:8080/seller/profiling/personal-update'; // ganti sesuai alamat API kamu

  const payloadBenar = JSON.stringify({
   identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_username_seller: "ananapparel_112",
    update_nama_seller: "Faiz Apparel",
    update_email_seller: "ananmantap@gmail.com"
  });

  const payloadSalah = JSON.stringify({
   identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_username_seller: "ananapparel", // salah username tak memiliki angka
    update_nama_seller: "Faiz Apparel",
    update_email_seller: "BLANK"
  });

  let params = {
     headers: {
       "Content-Type": "application/json",
     },
   };
 
   const resBenar = http.post(url, payloadBenar, params);
   const resSalah = http.post(url, payloadSalah, params);
 
   check(resBenar, {
     "skema benar status 200": (r) => r.status === 200,
   });
 
   check(resSalah, {
     "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
   });
 
   try {
     console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
     console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
   } catch {
     console.log("Respon Benar: ", resBenar.body);
     console.log("Respon Salah: ", resSalah.body);
   }
 
}
