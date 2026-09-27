// k6 run media/tambah_foto_toko_fisik_seller.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Baca file sekali di awal (bisa lebih dari 1)
const filePaths = [
  'foto/toko1.jpg',
  'foto/toko2.jpg',
  'foto/toko3.jpg',
]; // maksimal 5 foto, urut sesuai yang dikirim ke backend
const fileBytesArray = filePaths.map((p) => open(p, 'b'));

// Payload ekstensi harus sesuai urutan file
const ekstensiArrayValid = ['jpg', 'jpg', 'jpg'];

export let options = {
  vus: 1,
  iterations: 1, // cukup 1x biar jelas
};

// TambahkanFotoTokoFisikSeller:

// Skema Benar:   Menyertakan Identitas Seller
//                Seluruh Isi Ekstensi Valid Untuk Foto

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                Isi Ekstensi ada yang tidak valid untuk foto

export default function () {
  const url = "http://localhost:8080/seller/media/tambah-foto-toko-fisik";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + MULTI UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    ekstensi: ekstensiArrayValid,
  });

  const resBenar = http.put(url, payloadBenar, params);

  check(resBenar, {
    "skema benar presigned status 200": (r) => r.status === 200,
  });

  // Parsing JSON & Multi Upload ke MinIO untuk Skema Benar
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
    console.log("Menerima URL untuk upload (Benar):", urlAndKey);

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
    }
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller & ada ekstensi yang tidak valid
    ekstensi: ["jpg", "gajelas", "png"],
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