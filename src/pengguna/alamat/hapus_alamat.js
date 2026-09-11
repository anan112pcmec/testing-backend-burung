// k6 run alamat/hapus_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,             // jumlah virtual user
  iterations: 1,      // lama tes
};

// HapusAlamatPengguna:
// Skema Benar & Salah untuk pengujian penghapusan alamat

export default function () {
  const url = "http://localhost:8080/user/alamat/hapus-alamat";

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "anan29837@gmail.com",
    },
    id_alamat_hapus_alamat: 3, 
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "anan29837@gmail.com",
    },
    id_alamat_hapus_alamat: -12, // ID tidak terdaftar / tidak valid
  });

  const params = {
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