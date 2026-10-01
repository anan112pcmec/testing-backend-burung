// k6 run barang/masukan_komentar_child.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // jumlah virtual user
  iterations: 1, // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-child/tambah'; // ganti sesuai alamat server kamu

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_komentar_masukan_komentar: 2, // ID komentar induk yang ingin diberi child
    id_barang_induk_child_komentar: 2, // ID barang induk yang sama dengan komentar induk
    komentar_masukan_komentar: "Mantap Man"
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_komentar_masukan_komentar: -2, // salah id komentar lebih kecil dari 0
    id_barang_induk_child_komentar: 2, // ID barang induk yang sama dengan komentar induk
    komentar_masukan_komentar: "Mantap Man"
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
