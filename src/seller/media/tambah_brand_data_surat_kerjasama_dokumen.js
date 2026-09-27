// k6 run media/tambah_brand_data_surat_kerjasama_dokumen.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI (surat kerjasama)
const fileBytes = open('dokumen/brand_surat_kerjasama.pdf', 'b');

export let options = {
  vus: 1,
  iterations: 1, // deterministic
};

// TambahBrandDataSuratKerjasamaDokumen:

// Skema Benar:   Menyertakan Identitas Seller
//                IdBrandData Lebih besar dari 0
//                Ekstensi Valid Untuk Dokumen

// Skema Salah:   Tidak Menyertakan Identitas Seller
//                IdBrandData Lebih kecil atau sama dengan 0
//                Ekstensi Tidak Valid Untuk Dokumen

export default function () {
  const url = "http://localhost:8080/seller/media/tambah-dokumen-brand-data-surat-kerjasama";
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_brand_data: 5,
    ekstensi: "pdf",
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
        "Content-Type": "application/pdf",
      },
    });

    check(uploadRes, {
      "upload dokumen success": (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_seller
    id_brand_data: 0,   // IdBrandData <= 0
    ekstensi: "exe",    // Ekstensi dokumen tidak valid
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