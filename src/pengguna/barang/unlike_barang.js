// k6 run barang/unlike_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  iterations: 1,      // durasi test
};

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdBarangDisukai harus lebih besar dari 0
// 		IdBarangInduk harus lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdBarangDisukai lebih kecil atau sama dengan 0
// 		IdBarangInduk lebih kecil atau sama dengan 0


const url = "http://localhost:8080/user/barang/unlikes-barang"; // GANTI sesuai servermu

export default function () {
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_disukai: 1,
    id_barang_induk: 2,
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_barang_disukai: 1,
    id_barang_induk: 2,
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
