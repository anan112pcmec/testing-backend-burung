// k6 run barang/masukan_komentar_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // satu virtual user
  iterations: 1, // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-barang/tambah'; // ganti sesuai alamat server kamu

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_masukan_komentar: 2,
    komentar_masukan_komentar: "Kemejanya keren banget, bahan halus dan potongannya rapi!"
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_masukan_komentar: 2,
    komentar_masukan_komentar: "" // salah komentar kosong
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
             console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
           } catch {
             console.log(resBenar.body);
             console.log(resSalah.body)
           }
}
