// k6 run media/tambah_foto_review_barang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI DI AWAL
const filePaths = [
  'foto/review1.jpg',
  'foto/review2.jpg',
  'foto/review3.jpg',
];
const fileBytesArray = filePaths.map((p) => open(p, 'b'));

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// TambahMediaReviewFoto:

// Skema Benar:   Menyertakan identitas pengguna
//                IdReviewData lebih besar dari 0
//                Semua ekstensi adalah ekstensi foto yang valid

// Skema Salah:   Tidak Menyertakan Identitas pengguna
//                IdReviewData lebih kecil atau sama dengan 0
//                Ada ekstensi dimana ekstensi bukan merupakan ekstensi foto yang valid

export default function () {
  const url = "http://localhost:8080/user/media/tambah-foto-review-barang";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_review_data: 123,                 // > 0
    ekstensi: ['jpg', 'jpeg', 'png'],   // Ekstensi foto valid
  });

  const resBenar = http.put(url, payloadBenar, params);

  check(resBenar, {
    "skema benar presigned status 200": (r) => r.status === 200,
  });

  // Iterasi Upload untuk Setiap Presigned URL pada Skema Benar
  let urlAndKey = [];
  try {
    const json = resBenar.json();
    urlAndKey = json.url_and_key || json.data?.url_and_key || [];
  } catch (e) {
    console.error("Gagal parse JSON Skema Benar:", resBenar.body);
  }

  if (urlAndKey.length === 0) {
    console.error("URL AND KEY SKEMA BENAR KOSONG!");
    console.error("RESPONSE BENAR:", resBenar.body);
  } else {
    console.log("Menerima URL untuk upload:", urlAndKey);

    for (let i = 0; i < urlAndKey.length; i++) {
      const uploadUrl = urlAndKey[i].upload_url;
      const fileBytes = fileBytesArray[i % fileBytesArray.length];

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

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_pengguna
    id_review_data: 0,                   // <= 0
    ekstensi: ['jpg', 'exe', 'pdf'],     // Ada ekstensi foto tidak valid
  });

  const resSalah = http.put(url, payloadSalah, params);

  check(resSalah, {
    "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
  });

  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log("Respon Benar: ", resBenar.body);
    console.log("Respon Salah: ", resSalah.body);
  }

  sleep(1);
}