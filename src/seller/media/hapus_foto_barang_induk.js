// k6 run media/hapus_foto_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusMediaBarangIndukFoto:

// Skema Benar:   Menyertakan Identitas Seller
//                IdMedia dalam Data DataMediaBarangIndukFoto tidak ada yang lebih kecil dari 0 dan KeyMedia tak boleh kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdMedia dalam data DataMediaBarangIndukFoto ada yang lebih kecil dari nol atau KeyMedia ada yang kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-foto-barang-induk";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    data_media_dan_key: [
      { id_media_barang_induk_foto: 20, key: "barang1.jpg" },
      { id_media_barang_induk_foto: 21, key: "barang2.jpg" },
      { id_media_barang_induk_foto: 22, key: "barang3.jpg" },
    ],
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    data_media_dan_key: [
      { id_media_barang_induk_foto: -5, key: "barang1.jpg" }, // ID < 0
      { id_media_barang_induk_foto: 21, key: "" },             // Key kosong
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