// k6 run barang/likes_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  iterations: 1,       // durasi test
};

// LikesBarang:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdBarangInduk harus lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdBarangInduk lebih kecil atau sama dengan 0


export default function () {
  const url = "http://localhost:8080/user/barang/likes-barang";

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_induk_likes: 2,     // ⚠️ ganti sesuai ID barang
  });

   const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_induk_likes: -2,     // Salah Id kurang dari 0
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
  

 

}
