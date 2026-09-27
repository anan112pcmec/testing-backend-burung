// k6 run media/hapus_distributor_data_dokumen.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusMediaDistributorDataDokumen:

// Skema Benar:   Menyertakan Identitas Seller
//                IdDistributorData Lebih besar dari 0
//                IdMediaDistributorDataDokumen Lebih besar dari 0
//                KeyDokumen Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdDistributorData Lebih kecil atau sama dengan 0
//                IdMediaDistributorDataDokumen Lebih kecil atau sama dengan 0
//                KeyDokumen Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-dokumen-distributor-data";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_distributor_data: 8,
    id_media_distributor_data_dokumen: 5,
    key_dokumen: "seller/distributor_data/8/dokumen_5.pdf",
  });

  const payloadSalah = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_distributor_data: 0,                 // IdDistributorData <= 0
    id_media_distributor_data_dokumen: -1,  // IdMediaDistributorDataDokumen <= 0
    key_dokumen: "",                         // KeyDokumen kosong
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