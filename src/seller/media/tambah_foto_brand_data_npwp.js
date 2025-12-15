// k6 run media/tambah_foto_brand_data_npwp.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI (contoh JPG)
const fileBytes = open('foto/brand_npwp.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  /* ===============================
     1️⃣ MINTA PRESIGNED URL (PUT)
     =============================== */
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_brand_data: 5,   // ⬅️ pastikan ada di DB
    ekstensi: "jpg",
  });

  const presignedRes = http.put(
    "http://localhost:8080/seller/media/tambah-foto-brand-data-npwp",
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
    "upload foto brand NPWP success": (r) =>
      r.status === 200 || r.status === 204,
  });

  sleep(1);
}
