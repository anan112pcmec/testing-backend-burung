// k6 run barang/tambah_keranjang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // lama test
};

// TambahDataKeranjangBarang:

// Skema Benar:  	Menyertakan Identitas Pengguna
// 		IdSeller lebih besar dari 0
// 		IdBarangInduk lebih besar dari 0
// 		IdKategori Lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdSeller lebih kecil atau sama dengan 0
// 		IdBarangInduk lebih kecil atau sama dengan 0	
// 		IdKategori lebih kecil atau sama dengan 0


export default function () {
  const url = "http://localhost:8080/user/barang/keranjang-barang/tambah"; // GANTI sesuai server

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 2,
      username_pengguna: "ananlol_anjay11",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_seller: 1,        // GANTI sesuai seller
    id_barang_induk: 20,  // GANTI sesuai barang
    id_kategori_barang: 48 // GANTI sesuai kategori
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 2,
      username_pengguna: "ananlol_anjay11",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_seller: -1,        // gagal lebih kecil dari 0
    id_barang_induk: 6,  
    id_kategori_barang: 14 
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
