// k6 run media/ubah_foto_kategori_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI DI AWAL
const fileBytes = open('foto/kategori_barang.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1, // cukup 1x biar jelas
};

// UbahKategoriBarangFoto:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBarangInduk Lebih besar dari 0
//                IdKategoriBarang Lebih besar dari 0
//                Ekstensi Valid Untuk Foto

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBarangInduk Lebih kecil atau sama dengan 0
//                IdKategoriBarang Lebih kecil atau sama dengan 0
//                Ekstensi Tidak Valid Untuk Foto

export default function () {
  const url = "http://localhost:8080/seller/media/ubah-foto-kategori-barang";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_barang_induk: 25,
    id_kategori_barang: 14,
    ekstensi: "jpg",
  });

  const resBenar = http.put(url, payloadBenar, params);

  check(resBenar, {
    "skema benar presigned status 200": (r) => r.status === 200,
  });

  // Parsing JSON & Upload ke MinIO untuk Skema Benar
  let uploadUrl = null;
  try {
    const json = resBenar.json();

    uploadUrl =
      json.upload_url ||
      json.data?.upload_url ||
      json.p?.upload_url ||
      json.response_payload?.upload_url;
  } catch (e) {
    console.error("Gagal parse JSON Skema Benar:", resBenar.body);
  }

  if (!uploadUrl) {
    console.error("UPLOAD URL SKEMA BENAR KOSONG!");
    console.error("RESPONSE BENAR:", resBenar.body);
  } else {
    console.log("UPLOAD URL BENAR:", uploadUrl);

    const uploadRes = http.put(uploadUrl, fileBytes, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

    check(uploadRes, {
      "upload foto kategori success": (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_barang_induk: 0,       // IdBarangInduk <= 0
    id_kategori_barang: -10,  // IdKategoriBarang <= 0
    ekstensi: "gajelas",      // Ekstensi foto tidak valid
  });

  const resSalah = http.put(url, payloadSalah, params);

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