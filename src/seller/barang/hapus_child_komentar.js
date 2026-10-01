// k6 run barang/hapus_child_komentar.js
import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi simulasi
export const options = {
  vus: 1, // jumlah virtual users
  duration: "15s", // durasi tes
};

export default function () {
  const url = "http://localhost:8080/seller/komentar-child/hapus";

  // Payload sesuai struct PayloadHapusChildKomentar
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: 2,
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: -2, // salah id child komentar lebih kecil dari 0
  });

  const params = {
               headers: {
                 'Content-Type': 'application/json',
               },
             };
           
              const resBenar = http.del(url, payloadBenar, params);
               const resSalah = http.del(url, payloadSalah, params)
             
               try {
                 console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
                 console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
               } catch {
                 console.log(resBenar.body);
                 console.log(resSalah.body)
               }

}
