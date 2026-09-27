// k6 run media/hapus_foto_distributor_data_nib.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusDistributorDataNIBFoto:

// Skema Benar:   Menyertakan Identitas Seller
//                IdDistributorData Lebih besar dari 0
//                IdMediaDistributorDataNIBFoto Lebih besar dari 0
//                KeyFoto Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdDistributorData Lebih kecil atau sama dengan 0
//                IdMediaDistributorDataNIBFoto Lebih kecil atau sama dengan 0
//                KeyFoto Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-distributor-data-nib";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_distributor_data: 8,
    id_media_distributor_data_nib_foto: 4,
    key_foto: "seller/distributor_data/8/nib/foto_4.jpg",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_distributor_data: 0,                 // IdDistributorData <= 0
    id_media_distributor_data_nib_foto: -1, // IdMediaDistributorDataNIBFoto <= 0
    key_foto: "",                           // KeyFoto kosong
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