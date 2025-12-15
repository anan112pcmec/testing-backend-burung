// k6 run media/tambah_foto_transaksi_approved.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI DI AWAL (FOTO)
const fileBytes = open('foto/approve_transaksi.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1,
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
    id_transaksi: 123, // ⬅️ SESUAI DB
    ekstensi: "jpg",
  });

  const presignedRes = http.put(
    "http://localhost:8080/seller/media/tambah-foto-approve-transaksi",
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
     2️⃣ UPLOAD FOTO KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });

  check(uploadRes, {
    "upload foto approve transaksi success": (r) =>
      r.status === 200 || r.status === 204,
  });

  sleep(1);
}
