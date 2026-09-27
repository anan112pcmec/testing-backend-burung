// k6 run media/hapus_dokumen_brand_data_perwakilan.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusBrandDataPerwakilanDokumen:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBrandData Lebih besar dari 0
//                IdMediaBrandDataPerwakilanDokumen Lebih besar dari 0
//                KeyDokumen Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBrandData Lebih kecil atau sama dengan 0
//                IdMediaBrandDataPerwakilanDokumen Lebih kecil atau sama dengan 0
//                KeyDokumen Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-dokumen-brand-data-perwakilan";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_brand_data: 5,
    id_media_brand_data_perwakilan_dokumen: 11,
    key_dokumen: "brand/perwakilan/surat_perwakilan_abc.pdf",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_brand_data: 0,                          // IdBrandData <= 0
    id_media_brand_data_perwakilan_dokumen: -1, // IdMediaBrandDataPerwakilanDokumen <= 0
    key_dokumen: "",                           // KeyDokumen kosong
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