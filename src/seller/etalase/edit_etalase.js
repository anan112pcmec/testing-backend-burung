// k6 run etalase/edit_etalase.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// EditEtalase:


// Skema Benar: 	Menyertakan Identitas Seller 
// 		IdEtalase lebih besar dari 0
// 		Nama  Etalase harus lebih dari 5 karakter
		
// Skema Salah:	Tidak Menyertakan Identitas Seller
// 		IdEtalase lebih kecil dari 0 atau kosong atau nol 
// 		Nama Etalase kurang dari 5 karakter


export default function () {
  const url = "http://localhost:8080/seller/etalase/edit-etalase"; // path asli sesuai backend

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_etalase: 1, // ganti sesuai ID etalase yang mau diedit
    nama: "Etalase Burung Premium",
    deksripsi: "Etalase khusus produk burung premium dan langka.",
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_etalase: -10, // Salah id kurang dari 0
    nama: "Etalase Burung Premium",
    deksripsi: "Etalase khusus produk burung premium dan langka.",
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
