// k6 run barang/hapus_child_komen.js
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  duration: "1s",  // lama test
};

// HapusChildKomentar:

// Skema Benar:	Menyertakan Identitas Pengguna
// 		IdKomentar harus lebih besar dari 0

// Skema Salah:	Tidak Menyertakan Identitas Pengguna
// 		IdKomentar lebih kecil atau sama dengan 0


export default function () {
  const url = "http://localhost:8080/user/barang/komentar-child/hapus"; // ganti kalau endpoint berbeda

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_child_komentar: 7284 // GANTI sesuai id child komentar yang ingin dihapus
  });

   const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com"
    },
    id_child_komentar: -112 // gagal lebih kecil dari 0
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
