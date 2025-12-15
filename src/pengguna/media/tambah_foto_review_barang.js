// k6 run media/tambah_foto_review_barang.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Baca file sekali di awal (bisa lebih dari 1)
const filePaths = [
  'foto/review1.jpg',
  'foto/review2.jpg',
  'foto/review3.jpg',
]; // ⬅️ maksimal 5 foto, urut sesuai yang dikirim ke backend
const fileBytesArray = filePaths.map((p) => open(p, 'b'));

// Payload ekstensi harus sesuai urutan file
const ekstensiArray = ['jpg', 'jpg', 'jpg']; // urut sesuai filePaths

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  /* ===============================
     1️⃣ MINTA PRESIGNED URL UNTUK REVIEW
     =============================== */
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_review_data: 123, // sesuaikan ID review
    ekstensi: ekstensiArray,
  });

  const presignedRes = http.put(
    "http://localhost:8080/user/media/tambah-foto-review-barang",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(presignedRes, {
    "presigned status 200": (r) => r.status === 200,
  });

  let urlAndKey = [];
  try {
    const json = presignedRes.json();
    urlAndKey = json.url_and_key || [];
  } catch (e) {
    console.error("Gagal parse JSON:", presignedRes.body);
    return;
  }

  if (urlAndKey.length === 0) {
    console.error("URL AND KEY KOSONG!");
    console.error("RESPONSE:", presignedRes.body);
    return;
  }

  console.log("Menerima URL untuk upload:", urlAndKey);

  /* ===============================
     2️⃣ UPLOAD FILE KE SETIAP URL
     =============================== */
  for (let i = 0; i < urlAndKey.length; i++) {
    const uploadUrl = urlAndKey[i].upload_url;
    const fileBytes = fileBytesArray[i];

    const uploadRes = http.put(uploadUrl, fileBytes, {
      headers: { "Content-Type": "image/jpeg" },
    });

    check(uploadRes, {
      [`upload file ${i + 1} success`]: (r) => r.status === 200 || r.status === 204,
    });

    console.log(`Upload file ${i + 1} selesai:`, urlAndKey[i].key);
    sleep(1);
  }
}
