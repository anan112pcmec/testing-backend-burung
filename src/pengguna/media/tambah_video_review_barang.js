// k6 run media/tambah_video_review_barang.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI DI AWAL (VIDEO)
const fileBytes = open('video/review_barang.mp4', 'b');

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  /* ===============================
     1️⃣ MINTA PRESIGNED URL
     =============================== */
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_review_data: 456, // ⬅️ SESUAI DB
    ekstensi: "mp4",
  });

  const presignedRes = http.put(
    "http://localhost:8080/user/media/tambah-video-review-barang",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(presignedRes, { "presigned status 200": (r) => r.status === 200 });

  // ❗ PARSING RESPONSE AMAN
  let uploadUrl = null;

  try {
    const json = presignedRes.json();
    uploadUrl =
      json.upload_url ||
      json.data?.upload_url ||
      json.response_payload?.upload_url;
  } catch (e) {
    console.error("Gagal parse JSON:", presignedRes.body);
    return;
  }

  if (!uploadUrl) {
    console.error("UPLOAD URL KOSONG!");
    console.error("RESPONSE:", presignedRes.body);
    return;
  }

  console.log("UPLOAD URL:", uploadUrl);

  /* ===============================
     2️⃣ UPLOAD VIDEO KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: { "Content-Type": "video/mp4" },
  });

  check(uploadRes, {
    "upload video review success": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
