// k6 run barang/edit_alamat_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual users
  iterations: 1, // tiap VU jalan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/edit-alamat-barang-induk'; // ganti sesuai URL server

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,       // contoh ID barang induk
    id_alamat_gudang: 8       // contoh ID alamat gudang baru
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,       // contoh ID barang induk
    id_alamat_gudang: 0       // salah id alamat gudang sama dengan 0
  });

  const params = {
         headers: {
           'Content-Type': 'application/json',
         },
       };
     
        const resBenar = http.patch(url, payloadBenar, params);
         const resSalah = http.patch(url, payloadSalah, params)
       
         try {
           console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
           console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
         } catch {
           console.log(resBenar.body);
           console.log(resSalah.body)
         }
}
