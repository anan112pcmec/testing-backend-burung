// k6 run barang/mention_child_komentar.js
import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  vus: 1,      // jumlah virtual user
  iterations: 1, // durasi test
};

// MentionChildKomentar:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdKomentarBarang harus lebih besar dari 0
// 		UsernameMentioned harus memiliki setidaknya 1 angka dan underscore
// 		Komentar tidak berisikan string kosong atau kasarnya kosong

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKomentarBarang lebih kecil atau sama dengan 0
// 		UsernameMentioned tidak memiliki setidaknya 1 angka dan underscore
// 		Komentar berisikan string kosong atau kasarnya kosong


export default function () {
  const url = "http://localhost:8080/user/barang/komentar-child-mention/tambah"; // GANTI dengan URL lu

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_komentar_child_komentar: 2,   // ganti
    username_mention_komentar: "anan123_",
    komentar_mention_komentar: "Barang ini bagus banget!" // ganti
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_komentar_child_komentar: 2,   // ganti
    username_mention_komentar: "anan123_",
    komentar_mention_komentar: "Barang ini bagus banget!" // ganti
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
