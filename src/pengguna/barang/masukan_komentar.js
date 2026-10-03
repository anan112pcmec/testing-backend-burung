// k6 run barang/masukan_komentar.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // satu virtual user
  iterations: 1,   // dijalankan sekali
};

// MasukanKomentarBarang:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdBarangInduk harus lebih besar dari 0
// 		Komentar tidak berisikan string kosong atau kasarnya kosong

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdBarangInduk lebih kecil atau sama dengan 0
// 		Komentar berisikan string kosong atau kasarnya kosong


export default function () {
  const url = 'http://localhost:8080/user/komentar-barang/tambah'; // ganti sesuai server

  const payloadBenar = JSON.stringify({
    identitas_pengguna:{
        id_pengguna:1,
        username_pengguna:"ananlol",
        email_pengguna:"ananlol156@gmail.com",
    },
    id_barang_induk_Masukan_komentar:"makna atap",
    komentar_masukan_komentar:2 // contoh ID barang induk yang ingin di-down stok
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna:{
        id_pengguna:1,
        username_pengguna:"ananlol",
        email_pengguna:"ananlol156@gmail.com",
    },
    id_barang_induk_Masukan_komentar:"makna atap",
    komentar_masukan_komentar:-22 // salah lebih kecil dari 0
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
