import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,          // satu virtual user
  iterations: 1,   // dijalankan sekali
};

export default function () {
  const url = 'http://localhost:8080/seller/barang/down-barang-induk'; // ganti sesuai server

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_down: 3  // contoh ID barang induk yang ingin di-down stok
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_down: -2  // salah, id barang induk lebih kecil dari 0
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
