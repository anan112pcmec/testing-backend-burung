// k6 run media/tambah_foto_informasi_ktp.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Baca file sekali di awal (KTP)
const fileBytes = open('foto/ktp.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  /* ===============================
     1️⃣ MINTA PRESIGNED URL
     =============================== */
  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com"
    },
    ekstensi: "jpg",
  });

  const presignedRes = http.put(
    "http://localhost:8080/kurir/media/tambah-foto-informasi-kurir-ktp",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(presignedRes, {
    "presigned status 200": (r) => r.status === 200,
  });

  // ❗ Parsing JSON
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
     2️⃣ UPLOAD FILE KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: { "Content-Type": "image/jpeg" },
  });

  check(uploadRes, {
    "upload KTP success": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
