// k6 run media/tambah_brand_data_surat_kerjasama_dokumen.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI
const fileBytes = open('dokumen/brand_surat_kerjasama.pdf', 'b');

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
    id_brand_data: 5, // ⬅️ HARUS ADA DI DB
    ekstensi: "pdf",
  });

  const presignedRes = http.put(
    "http://localhost:8080/seller/media/tambah-dokumen-brand-data-surat-kerjasama",
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
    console.error(presignedRes.body);
    return;
  }

  console.log("UPLOAD URL:", uploadUrl);

  /* ===============================
     2️⃣ UPLOAD KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });

  check(uploadRes, {
    "upload dokumen success": (r) =>
      r.status === 200 || r.status === 204,
  });

  sleep(1);
}
