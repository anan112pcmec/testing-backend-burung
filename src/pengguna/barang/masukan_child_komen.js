// k6 run barang/masukan_child_komen.js
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,
  iterations: 1,
};

// MasukanChildKomentar:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdKomentarBarang harus lebih besar dari 0
// 		Komentar tidak berisikan string kosong atau kasarnya kosong

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKomentarBarang lebih kecil atau sama dengan 0
// 		Komentar berisikan string kosong atau kasarnya kosong


export default function () {
  const url = "http://localhost:8080/user/barang/komentar-child/tambah"

  const payloadBenar = JSON.stringify({
      identitas_pengguna: {
        id_pengguna: 1,
        username_pengguna: "ananlol",
        email_pengguna: "ananlol156@gmail.com",
      },
      id_komentar_masukan_komentar: 1148,
      komentar_masukan_komentar: "ini komentar child woy",
    })

    const payloadSalah = JSON.stringify({
      identitas_pengguna: {
        id_pengguna: 1,
        username_pengguna: "ananlol",
        email_pengguna: "ananlol156@gmail.com",
      },
      id_komentar_masukan_komentar: -1148, // gagal lebih kecil dari 0
      komentar_masukan_komentar: "ini komentar child woy",
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
         console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2))
       } catch {
         console.log(resBenar.body);
         console.log(resSalah.body)
       }
}
