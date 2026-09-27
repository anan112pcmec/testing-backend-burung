// k6 run media/hapus_foto_profil.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1, // lama test /media_seller_profil_foto/1/ddf9c747ebbf22bc69f06ab1-pto.jpg
};

// HapusFotoProfilSeller:

// Skema Benar: 	Menyertakan Identitas Seller
// 		IdMediaSellerProfilFoto Lebih besar dari 0
// 		KeyFoto tak boleh kosong

// Skema Salah: 	Tidak Menyertakan Identitas seller
// 		IdMediaSellerProfilFoto lebih kecil atau sama dengan 0
// 		KeyFoto Kosong


export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-profile"; // ganti kalau beda

  const payloadBenar = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_seller_profil_foto: 1,
    key_foto:"/media_seller_profil_foto/1/ddf9c747ebbf22bc69f06ab1-pto.jpg"  // GANTI sesuai id komentar yg mau dihapus
  });

  const payloadSalah = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_seller_profil_foto: -10, // Salah id lebih kecil dari 0
    key_foto:"/media_seller_profil_foto/1/ddf9c747ebbf22bc69f06ab1-pto.jpg"  // GANTI sesuai id komentar yg mau dihapus
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
