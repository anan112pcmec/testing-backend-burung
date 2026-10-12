// k6 run media/tambah_foto_pengiriman_picked_up.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI DI AWAL (FOTO PENGIRIMAN)
const fileBytes = open('foto/picked_up.jpg', 'b');

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// TambahFotoPengirimanNonEkspedisiPickedUp:

// Skema Benar:   Menyertakan Identitas Kurir
//                IdPengiriman lebih besar dari 0
//                Ekstensi foto valid

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                IdPengiriman lebih kecil atau sama dengan 0
//                Ekstensi foto tidak valid

export default function () {
  const url = "http://localhost:8080/kurir/media/tambah-foto-pengiriman-non-ekspedisi-picked_up";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_kurir: {
      id_kurir: 2,
      username_kurir: "kurir_4d09a543",
      email_kurir: "anan29837@gmail.com",
    },
    id_pengiriman: 101, // > 0
    ekstensi: "jpg",    // Ekstensi foto valid
  });

  const resBenar = http.put(url, payloadBenar, params);

  check(resBenar, {
    "skema benar presigned status 200": (r) => r.status === 200,
  });

  // Parsing JSON & Upload ke MinIO untuk Skema Benar
  let uploadUrl = null;
  try {
    const json = resBenar.json();
    uploadUrl =
      json.upload_url ||
      json.data?.upload_url ||
      json.p?.upload_url ||
      json.response_payload?.upload_url;
  } catch (e) {
    console.error("Gagal parse JSON Skema Benar:", resBenar.body);
  }

  if (!uploadUrl) {
    console.error("UPLOAD URL SKEMA BENAR KOSONG!");
    console.error("RESPONSE BENAR:", resBenar.body);
  } else {
    console.log("UPLOAD URL BENAR:", uploadUrl);

    const uploadRes = http.put(uploadUrl, fileBytes, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

    check(uploadRes, {
      "upload picked-up success": (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    id_pengiriman: 0,   // <= 0
    ekstensi: "exe",    // Ekstensi foto tidak valid
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