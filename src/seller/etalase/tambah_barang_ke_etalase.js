// k6 run etalase/tambah_barang_ke_etalase.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// TambahkanBarangKeEtalase:

// Skema Benar:	Menyertakan Identitas Seller
// 		IdEtalase lebih besar dari 0
// 		IdBarangInduk lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Seller
// 		IdEtalase lebih kecil dari 0 
// 		IdBarangInduk lebih kecil dari 0


export default function () {
  const url = "http://localhost:8080/seller/etalase/tambah-barang-ke-etalase";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_etalase: 1,        // ganti sesuai ID etalase tujuan
    id_barang_induk: 2,  // ganti sesuai ID barang induk yang ingin ditambahkan
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_etalase: -1,        // salah id_etalase lebih kecil dari 0
    id_barang_induk: -2,  // salah id_barang_induk lebih kecil dari 0
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.patch(url, payloadBenar, params);
        const resSalah = http.patch(url, payloadSalah, params);
           
               check(resBenar, {
                 "skema benar status 200": (r) => r.status === 200,
               });
             
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
