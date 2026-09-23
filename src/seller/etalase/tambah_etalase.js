// k6 run etalase/tambah_etalase.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// MenambahEtalase:

// Skema Benar:	Menyertakan Identitas Seller 
// 		Nama Etalase harus lebih dari 5 karakter

// Skema Salah: 	Tidak Menyertakan Identitas Seller 
// 		Nama Etalase lebih sedikit dari 5 karakter



export default function () {
  const url = "http://localhost:8080/seller/etalase/tambah-etalase"; // path asli sesuai backend

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama: "Etalase Baju Modis",
    deksripsi: "Etalase khusus untuk semua produk Baju premium.",
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama: "dis", // salah kurang dari 5 karakter
    deksripsi: "Etalase khusus untuk semua produk Baju premium.",
  })

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
