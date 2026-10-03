// k6 run barang/edit_child_komen.js

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // lama test
};

// EditChildKomentar:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdKomentar harus lebih besar dari 0
// 		Komentar tidak berisikan string kosong atau kasarnya kosong

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKomentar lebih kecil atau sama dengan 0
// 		Komentar berisikan string kosong atau kasarnya kosong

export default function () {
  const url = "http://localhost:8080/user/barang/komentar-child/edit"; 

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_child_komentar: 7283,                        // GANTI sesuai data real
    komentar_child_komentar: "Komentar child ini sudah saya ubah via k6!"
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_child_komentar: -7283,                        // salah lebih kecil dari 0
    komentar_child_komentar: "Komentar child ini sudah saya ubah via k6!"
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
