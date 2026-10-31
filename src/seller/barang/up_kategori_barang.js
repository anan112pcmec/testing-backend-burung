// k6 run barang/up_kategori_barang.js

import http from 'k6/http';
import {check, sleep} from "k6"

export const options = {
    vus: 1,
    iterations: 1,
}

export default function(){
    const url = 'http://localhost:8080/seller/barang/up-kategori-barang';
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      /* ===============================
         1️⃣ SKEMA BENAR
         =============================== */
      const payloadBenar = JSON.stringify({
      identitas_seller: {
        id_seller: 1,
        username_seller: "1nikereal_",
        email_seller: "appburung@gmail.com",
      },
       id_barang_induk: 19,
      id_kategori_barang: 45,
      jumlah: 0, //nol untuk up semua
    });
    
      const resBenar = http.patch(url, payloadBenar, params);
    
      check(resBenar, {
        "skema benar status 200": (r) => r.status === 200,
      });
    
      /* ===============================
         2️⃣ SKEMA SALAH (DITOLAK)
         =============================== */
      const payloadSalah = JSON.stringify({
        identitas_seller: {
        id_seller: 1,
        username_seller: "1nikereal_",
        email_seller: "appburung@gmail.com",
      },
      id_barang_induk: -18,
      id_kategori_barang: -8,
      jumlah: 20,
      });
    
      const resSalah = http.patch(url, payloadSalah, params);
    
      check(resSalah, {
        "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
      });
    
      try {
        console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
        console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
      } catch {
        console.log("Respon Benar: ", resBenar.body);
        console.log("Respon Salah: ", resSalah.body);
      }
    
}