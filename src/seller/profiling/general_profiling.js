// k6 run profiling/general_profiling.js
import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual users
  iterations: 1,  // 
};

export default function () {
  const url = "http://localhost:8080/seller/profiling/info-general-update"; // ganti sesuai endpoint kamu

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_jam_operasional_seller: "08:00 - 17:00",
    update_punchline_seller: "Egila Laper Banget",
    update_deskripsi_seller: "Kami menyediakan berbagai produk unggulan dari UMKM lokal.",
    update_dedication_seller: "Elektronik & Gadget",
  });


  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    update_jam_operasional_seller: "08:00 - 17:0021 m", // Salah jam operasional tak pas 13 karakter dan mengandung huruf
    update_punchline_seller: "Egila Laper Banget",
    update_deskripsi_seller: "Kami menyediakan berbagai produk unggulan dari UMKM lokal.",
    update_dedication_seller: "Elektronik & Gadget",
  });

   let params = {
       headers: {
         "Content-Type": "application/json",
       },
     };
   
     const resBenar = http.post(url, payloadBenar, params);
     const resSalah = http.post(url, payloadSalah, params);
   
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
