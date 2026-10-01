// k6 run barang/edit_komentar_child.js
import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi load test
export const options = {
  vus: 1, // jumlah virtual users
  iterations: 1, // durasi test
};

export default function () {
  const url = "http://localhost:8080/seller/komentar-child/edit";

  // Data JSON sesuai struct PayloadEditChildKomentar
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: 2,
    komentar_child_komentar: "komentanya",
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_child_komentar: -2, // salah id child komentar lebih kecil dari 0
    komentar_child_komentar: "komentanya",
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
