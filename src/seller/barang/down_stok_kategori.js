import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,        // jumlah virtual users
  iterations: 1, // setiap VU jalan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/down-kategori-barang'; // ganti sesuai URL server

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,        // contoh ID barang induk
    id_kategori_barang: 10     // contoh ID rekening seller baru
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk: 2,        
    id_kategori_barang: -10     // salah, id kategori barang lebih kecil dari 0
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
