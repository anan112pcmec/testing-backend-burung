// k6 run media/ubah_foto_profil.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔥 BACA FILE SEKALI (foto profil pengguna)
const fileBytes = open('foto/ndiaa.jpg', 'b');

export let options = {
  vus: 1,
  iterations: 1, // deterministic
};

// UbahFotoProfilPengguna:

// Skema Benar:   Menyertakan Identitas Pengguna
//                Ekstensi Valid Untuk foto

// Skema Salah:   Tidak Menyertakan Identitas Pengguna
//                Ekstensi Tidak Valid untuk foto

export default function () {
  const url = 'http://localhost:8080/user/media/ubah-foto-profile';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /* ===============================
     1️⃣ SKEMA BENAR (PRESIGNED + UPLOAD)
     =============================== */
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: 'ananlol',
      email_pengguna: 'ananlol156@gmail.com',
    },
    ekstensi: 'jpg', // Ekstensi valid untuk foto
  });

  const resBenar = http.put(url, payloadBenar, params);

  check(resBenar, {
    'skema benar presigned status 200': (r) => r.status === 200,
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
    console.error('Gagal parse JSON Skema Benar:', resBenar.body);
  }

  if (!uploadUrl) {
    console.error('UPLOAD URL SKEMA BENAR KOSONG!');
    console.error('RESPONSE BENAR:', resBenar.body);
  } else {
    console.log('UPLOAD URL BENAR:', uploadUrl);

    const uploadRes = http.put(uploadUrl, fileBytes, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });

    check(uploadRes, {
      'upload foto profil success': (r) =>
        r.status === 200 || r.status === 204,
    });
  }

  /* ===============================
     2️⃣ SKEMA SALAH (DITOLAK)
     =============================== */
  const payloadSalah = JSON.stringify({
    // Tidak menyertakan identitas_pengguna
    ekstensi: 'exe', // Ekstensi foto tidak valid
  });

  const resSalah = http.put(url, payloadSalah, params);

  check(resSalah, {
    'skema salah ditolak (bukan 200)': (r) => r.status !== 200,
  });

  try {
    console.log('Skema Benar: ', JSON.stringify(JSON.parse(resBenar.body), null, 2));
    console.log('Skema Salah: ', JSON.stringify(JSON.parse(resSalah.body), null, 2));
  } catch {
    console.log('Respon Benar: ', resBenar.body);
    console.log('Respon Salah: ', resSalah.body);
  }

  sleep(1);
}