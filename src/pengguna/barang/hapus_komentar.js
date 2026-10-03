// k6 run barang/hapus_komen
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1, // lama test
};

// HapusKomentarBarang:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdKomentar harus lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKomentar lebih kecil atau sama dengan 0


export default function () {
  const url = "http://localhost:8080/user/barang/komentar-barang/hapus"; // ganti kalau beda

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_komentar_hapus_komentar: 1147  // GANTI sesuai id komentar yg mau dihapus
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_komentar_hapus_komentar: -1147  // gagal, lebih kecil dari 0
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
