// k6 run media/hapus_foto_toko_fisik.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusFotoTokoFisikSeller:

// Skema Benar:   Menyertakan Identitas Seller
//                Id Media dalam Data MediaFotoTokoFisik tidak ada yang lebih kecil dari 0 dan keymedia tak boleh kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdMedia dalam data MediaFotoTokoFisik ada yang lebih kecil dari nol atau keymedia ada yang kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-toko-fisik";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    data_media_dan_key: [
      { id_media_seller_fisik_toko: 10, key: "toko1.jpg" },
      { id_media_seller_fisik_toko: 11, key: "toko2.jpg" },
      { id_media_seller_fisik_toko: 12, key: "toko3.jpg" },
    ],
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    data_media_dan_key: [
      { id_media_seller_fisik_toko: -1, key: "toko1.jpg" }, // ID < 0
      { id_media_seller_fisik_toko: 11, key: "" },          // Key kosong
    ],
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