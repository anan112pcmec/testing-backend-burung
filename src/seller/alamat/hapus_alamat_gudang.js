// k6 run alamat/hapus_alamat_gudang.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,             // jumlah virtual user
  iterations: 1,      // lama tes
};

// HapusAlamatGudang:
// Skema Benar:   Menyertakan id_hapus_alamat_gudang dan bernilai lebih besar dari 0
// Skema Salah:   Tidak menyertakan id_hapus_alamat_gudang atau bernilai tidak lebih besar dari 0 (<= 0)

export default function () {
  let url = "http://localhost:8080/seller/alamat/hapus-alamat-gudang";

  let payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_hapus_alamat_gudang: 1,
  });

  let payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_hapus_alamat_gudang: 0, // tidak lebih besar dari 0
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resBenar = http.del(url, payloadBenar, params);
  const resSalah = http.del(url, payloadSalah, params);

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log(resBenar.body);
    console.log(resSalah.body);
  }
}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "HapusAlamatGudang",
//   "pesan": "Berhasil",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "HapusAlamatGudang",
//   "pesan": "Gagal id alamat gudang tidak valid",
//   "response_payload": null
// }  source=console