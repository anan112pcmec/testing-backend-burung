// k6 run diskon/hapus_barang_dari_diskon.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// HapusDiskonPadaBarang:

// Skema Benar: 	Menyertakan Identitas Seller 
// 		IdBarangDiDiskon lebih besar dari 0 
		
// Skema Salah: 	Tidak Menyertakan Identitas Seller
// 		IdBarangDiDiskon lebih kecil dari 0 

// skemabenar: *, skemasalah: *,


export default function () {
  const url = "http://localhost:8080/seller/diskon/hapus-diskon-barang";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_barang_di_diskon: 1, // ganti sesuai ID barang yang ingin dihapus dari diskon
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal",
      email_seller: "appburung@gmail.com",
    },
    id_barang_di_diskon: 47, // ganti sesuai ID barang yang ingin dihapus dari diskon
  });

  const params = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    
       const resBenar = http.del(url, payloadBenar, params);
        const resSalah = http.del(url, payloadSalah, params);
      
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
