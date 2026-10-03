// k6 run barang/hapus_keranjang.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusDataKeranjangBarang:

// Skema Benar:  	Menyertakan Identitas Pengguna
// 		IdKeranjang lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKeranjang lebih kecil atau sama dengan 0


export default function () {
  const url = "http://localhost:8080/user/barang/keranjang-barang/hapus"; // GANTI sesuai server

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_keranjang: 1 // GANTI sesuai ID keranjang yang ingin dihapus
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_keranjang: -1 // salah lebih kecil dari 0
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
