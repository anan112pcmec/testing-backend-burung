// k6 run media/hapus_foto_brand_data_logo.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusMediaBrandDataLogoFoto:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBrandData Lebih besar dari 0
//                IdMediaBrandDataLogoBrandFoto Lebih besar dari 0
//                KeyFoto Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBrandData Lebih kecil atau sama dengan 0
//                IdMediaBrandDataLogoBrandFoto Lebih kecil atau sama dengan 0
//                KeyFoto Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-brand-data-logo";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "1nikereal_",
      email_seller: "appburung@gmail.com",
    },
    id_brand_data: 2,
    id_media_brand_data_logo_foto: 1,
    key_foto: "/media_brand_data_logo_foto/2/2784fd43ab4101f4735f6447-pto.jpg",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_brand_data: 0,                   // IdBrandData <= 0
    id_media_brand_data_logo_foto: -1,  // IdMediaBrandDataLogoBrandFoto <= 0
    key_foto: "",                       // KeyFoto kosong
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