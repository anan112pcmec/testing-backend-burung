// k6 run media/ubah_foto_banner.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Baca file SEKALI di awal (binary)
const fileBytes = open('foto/ndiaa.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1, // cukup 1x biar jelas
};

// UbahFotoBannerSeller:

// Skema Benar:   Menyertakan Identitas Seller
//                Ekstensi Valid Untuk Foto

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                Ekstensi Tidak Valid Untuk Foto

export default function () {
  const url = "http://localhost:8080/seller/media/ubah-foto-banner";
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
      "upload success": (r) => r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller & ekstensi tidak valid
    ekstensi: "gajelas",
  });

  const resSalah = http.put(url, payloadSalah, params);

  check(resSalah, {
    "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
  });

  try {
    console.log("Skema Benar:", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah:", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log("Respon Benar:", resBenar.body);
    console.log("Respon Salah:", resSalah.body);
  }

  sleep(1);
}