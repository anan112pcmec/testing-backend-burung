// k6 run media/ubah_video_barang_induk.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI DI AWAL (VIDEO)
const fileBytes = open('video/barang_induk.mp4', 'b');

export let options = {
  vus: 1,
  iterations: 1, // deterministic
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
    id_barang_induk: 25, // ⬅️ SESUAI DB
    ekstensi: "mp4",
  });

  const presignedRes = http.put(
    "http://localhost:8080/seller/media/ubah-video-barang-induk",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(presignedRes, {
    "presigned status 200": (r) => r.status === 200,
  });

  // ❗ PARSING JSON DENGAN AMAN
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

  // ❌ STOP JIKA URL KOSONG
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
    headers: {
      "Content-Type": "video/mp4",
    },
  });

  check(uploadRes, {
    "upload video success": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
