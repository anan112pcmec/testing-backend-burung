// k6 run media/tambah_foto_informasi_kendaraan.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Tentukan file path & baca file di awal
const fileBytes = open('foto/kendaraan_kurir.jpg', 'b'); // 'b' = binary

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
      email_kurir: "anan29837@gmail.com",
    },
    ekstensi: "jpg",
  });

  const presignedRes = http.put(
    "http://localhost:8080/kurir/media/tambah-foto-informasi-kendaraan-kurir-kendaraan",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  check(presignedRes, { "presigned status 200": (r) => r.status === 200 });

  // ❗ Parse JSON aman
  let uploadUrl = null;
  try {
    const json = presignedRes.json();
    uploadUrl = json.upload_url || json.data?.upload_url || json.response_payload?.upload_url;
  } catch (e) {
    console.error("Gagal parse JSON:", presignedRes.body);
    return;
  }

  if (!uploadUrl) {
    console.error("UPLOAD URL KOSONG!");
    return;
  }

  console.log("UPLOAD URL:", uploadUrl);

  /* ===============================
     2️⃣ UPLOAD FILE KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: { "Content-Type": "image/jpeg" },
  });

  check(uploadRes, { "upload foto kendaraan success": (r) => r.status === 200 || r.status === 204 });

  sleep(1);
}
