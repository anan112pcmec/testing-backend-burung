// k6 run media/tambah_video_review_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI DI AWAL (VIDEO)
const fileBytes = open('video/review_barang.mp4', 'b');

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// TambahMediaReviewVideo:

// Skema Benar:   Menyertakan identitas pengguna
//                IdReviewData lebih besar dari 0
//                Ekstensi adalah ekstensi video yang valid

// Skema Salah:   Tidak menyertakan identitas pengguna
//                IdReviewData lebih kecil dari 0
//                Ekstensi tidak berupa ekstensi video yang valid

export default function () {
  const url = "http://localhost:8080/user/media/tambah-video-review-barang";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_review_data: 456, // > 0
    ekstensi: "mp4",     // Ekstensi video valid
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
        "Content-Type": "video/mp4",
      },
    });

    check(uploadRes, {
      "upload video review success": (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_pengguna
    id_review_data: -1,  // < 0
    ekstensi: "exe",     // Ekstensi video tidak valid
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