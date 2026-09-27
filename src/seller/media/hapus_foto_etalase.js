// k6 run media/hapus_foto_etalase_seller.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusFotoEtalaseSeller:

// Skema Benar:   Menyertakan Identitas Seller
//                IdMediaEtalaseFoto lebih besar dari 0
//                KeyFoto Tidak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdMediaEtalaseFoto lebih kecil sama dengan 0
//                Keyfoto kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-etalase";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_etalase_foto: 7,
    key_foto: "seller/etalase/ananapparel/etalase_7.jpg",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_media_etalase_foto: 0, // IdMediaEtalaseFoto <= 0
    key_foto: "",             // KeyFoto kosong
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

  sleep(1);
}