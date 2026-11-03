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
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_media_etalase_foto: 2,
    key_foto: "/media_etalase_foto/2/2ef65dad5c1b9cdb5616103d-pto.jpg",
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

  sleep(1);
}