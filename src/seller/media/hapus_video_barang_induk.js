// k6 run media/hapus_video_barang_induk.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // lama test
};

// HapusBarangIndukVideo:

// Skema Benar:   Menyertakan Identitas Seller
//                IdMediaBarangIndukVideo Lebih besar dari 0
//                KeyVideo Tak Boleh Kosong

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdMediaBarangIndukVideo Lebih kecil atau sama dengan 0
//                KeyVideo Kosong

export default function () {
  const url = "http://localhost:8080/seller/media/hapus-video-barang-induk";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_barang_induk_video: 9,
    key_video: "seller/barang_induk/video/barang_25/video_9.mp4",
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_media_barang_induk_video: 0, // IdMediaBarangIndukVideo <= 0
    key_video: "",                  // KeyVideo kosong
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