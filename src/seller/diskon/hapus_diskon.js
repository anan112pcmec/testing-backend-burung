// k6 run diskon/hapus_diskon.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1, // jumlah virtual users
  iterations: 1, // durasi test
};

// HapusDiskonProduk:

// Skema Benar: 	Menyertakan Identitas Seller
// 		IdDuskonProduk Lebih besar dari 0

// Skema Salah: 	Tidak Menyertakan Identitas Seller 
// 		IdDiskonProduk Lebih kecil dari 0 

// skemabenar: *, skemasalah: *,

export default function () {
  const url = "http://localhost:8080/seller/diskon/hapus-diskon";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_diskon_produk: 1, // ubah sesuai ID diskon yang ingin dihapus
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_diskon_produk: -2, // ubah sesuai ID diskon yang ingin dihapus
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
