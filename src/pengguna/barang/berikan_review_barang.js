// k6 run barang/berikan_review_barang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // lama test
};

// BerikanReviewBarang:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdBarangInduk lebih besar dari 0
// 		Rating berada dalam range 0 sampai 5
		
// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdBarangInduk lebih kecil atau sama dengan 0
// 		Rating tidak berada dalam range 0 sampai 5

export default function () {
  const url = "http://localhost:8080/user/barang/review/tambah"; // GANTI sesuai server

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_barang_induk: 1,        // GANTI sesuai seller
    rating: 3.2,
    ulasan: "Mantap"
  });

  const payloadSalah = JSON.stringify({
   identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_barang_induk: 1,        // GANTI sesuai seller
    rating: 10, // salah diluar range 0 - 5
    ulasan: "Mantap"
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
