// k6 run media/ubah_foto_profil.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI DI AWAL (FOTO)
const fileBytes = open('foto/foto_profil_kurir.jpg', 'b');

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// UbahKurirProfilFoto:

// Skema Benar:   Menyertakan Identitas Kurir
//                Ekstensi foto valid

// Skema Salah:   Tidak Menyertakan Identitas Kurir
//                Ekstensi foto tidak valid

export default function () {
  const url = "http://localhost:8080/kurir/media/ubah-foto-profil-kurir";
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
    ekstensi: "jpg", // Ekstensi foto valid
  });

  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_kurir
    ekstensi: "exe", // Ekstensi foto tidak valid
  });
  


  const resBenar = http.put(url, payloadBenar, params);
  const resSalah = http.put(url, payloadSalah, params);

  check(resBenar, {
    "skema benar presigned status 200": (r) => r.status === 200,
  });
  
  check(resSalah, {
    "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
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
      "upload foto profil kurir success": (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  


  try {
    console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log("Respon Benar: ", resBenar.body);
    console.log("Respon Salah: ", resSalah.body);
  }

  sleep(1);
}