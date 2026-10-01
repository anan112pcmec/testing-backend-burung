// k6 run barang/mention_komentar_child.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/komentar-child-mention/tambah'; // ganti sesuai base URL server kamu

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_child_komentar: 2,        // ID barang induk yang relevan
    id_komentar_child_komentar: 1,           // ID komentar child yang akan diberi mention
    username_mention_komentar: "@tokosakura",  // username yang di-mention
    komentar_mention_komentar: "Hai tokosakura, terima kasih sudah kasih masukan!"
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_child_komentar: 2,        // ID barang induk yang relevan
    id_komentar_child_komentar: 1,           // ID komentar child yang akan diberi mention
    username_mention_komentar: "@tokosakura",  // username yang di-mention
    komentar_mention_komentar: "" // salah komentar kosong
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
