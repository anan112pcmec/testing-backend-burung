// k6 run diskon/masukan_barang_ke_diskon.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

// TetapkanDiskonPadaBarang: 

// Skema Benar: 	Menyertakan Identitas Seller
// 		IdDiskonProduk Lebih Besar dari 0
// 		IdBarangInduk lebih besar dari 0 
// 		IdKategoriBarang lebih besar dari 0 

// Skema Salah: 	Tidak Menyertakan Identitas Seller 
// 		IdDiskonProduk lebih kecil dari 0 
// 		IdBarangInduk lebih kecil dari 0 
// 		IdKategoriBarang lebih kecil dari 0 

// skemabenar: *,  skemasalah: *,



export default function () {
  const url = "http://localhost:8080/seller/diskon/masukan-barang";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_diskon_produk: 1, // ganti sesuai ID diskon yang ingin diterapkan
    id_barang_induk: 2, // ganti sesuai ID barang induk
    id_kategori_barang: 3, // ganti sesuai ID kategori barang
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_diskon_produk: -1, // Salah
    id_barang_induk: -2, // Salah
    id_kategori_barang: 3,
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
