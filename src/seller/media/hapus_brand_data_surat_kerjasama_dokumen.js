// k6 run media/hapus_brand_data_surat_kerjasama_dokumen.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusBrandDataSuratKerjasamaDokumen:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBrandData Lebih besar dari 0
//                IdMediaBrandDataSuratKerjasamaDokumen Lebih besar dari 0
//                KeyDokumen Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBrandData Lebih kecil atau sama dengan 0
//                IdMediaBrandDataSuratKerjasamaDokumen Lebih kecil atau sama dengan 0
//                KeyDokumen Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus/-dokumen-brand-data-surat-kerjasama";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_brand_data: 2,
    id_media_brand_data_surat_kerjasama_dokumen: 1,
    key_dokumen: "/media_brand_data_surat_kerjasama_dokumen/2/7043b4aeb8a8e8e357eb3f-dok.pdf",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_brand_data: 0,                                // IdBrandData <= 0
    id_media_brand_data_surat_kerjasama_dokumen: -1, // IdMediaBrandDataSuratKerjasamaDokumen <= 0
    key_dokumen: "",                                 // KeyDokumen kosong
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