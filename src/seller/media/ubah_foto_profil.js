// k6 run media/ubah_foto_profil.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// Baca file SEKALI di awal
const fileBytes = open('foto/ndiaa.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1, // cukup 1x biar jelas
};

export default function () {
  /* ===============================
     1️⃣ MINTA PRESIGNED URL
     =============================== */
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    ekstensi: "jpg",
  });

  const presignedRes = http.put(
    "http://localhost:8080/seller/media/ubah-foto-profile",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  check(presignedRes, {
    "presigned status 200": (r) => r.status === 200,
  });

  // ❗ PARSING JSON DENGAN AMAN
  let uploadUrl = null;

  try {
    const json = presignedRes.json();

    // 🔥 SESUAIKAN DENGAN BACKEND (AMAN)
    uploadUrl =
      json.upload_url ||
      json.data?.upload_url ||
      json.response_payload?.upload_url;
  } catch (e) {
    console.error("Gagal parse JSON:", presignedRes.body);
    return;
  }

  // ❌ STOP JIKA URL KOSONG
  if (!uploadUrl) {
    console.error("UPLOAD URL KOSONG!");
    console.error("RESPONSE:", presignedRes.body);
    return;
  }

  console.log("UPLOAD URL:", uploadUrl);

  /* ===============================
     2️⃣ UPLOAD FILE KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: {
      "Content-Type": "image/jpeg", // SESUAI ekstensi
    },
  });

  check(uploadRes, {
    "upload success": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
