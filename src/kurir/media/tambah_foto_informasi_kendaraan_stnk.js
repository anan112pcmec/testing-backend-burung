// k6 run media/tambah_foto_informasi_kendaraan_stnk.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ BACA FILE SEKALI DI AWAL (STNK)
const fileBytes = open('foto/stnk_kurir.jpg', 'b');

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
    ekstensi: "jpg", // bisa pdf/jpg/png sesuai tipe file
  });

  const presignedRes = http.put(
    "http://localhost:8080/kurir/media/tambah-foto-informasi-kendaraan-kurir-stnk",
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
    return;
  }

  console.log("UPLOAD URL:", uploadUrl);

  /* ===============================
     2️⃣ UPLOAD FILE KE MINIO
     =============================== */
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });

  check(uploadRes, {
    "upload stnk kurir success": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
