// k6 run media/ubah_foto_profil.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1️⃣ Tentukan file path & baca file di awal
const fileBytes = open('foto/ndiaa.jpg', 'b'); // 'b' = binary

export let options = {
  vus: 1,
  duration: '1s',
};

export default function () {
  // 2️⃣ Request presigned URL dari backend
  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: 'ananlol',
      email_pengguna: 'ananlol156@gmail.com'
    },
    ekstensi: 'jpg',
  });

  const presignedRes = http.put(
    'http://localhost:8080/user/media/ubah-foto-profile',
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(presignedRes, { 'status 200': (r) => r.status === 200 });

  const presignedData = presignedRes.json();
  const uploadUrl = presignedData.upload_url;

  // 3️⃣ Upload file ke MinIO via presigned URL
  const uploadRes = http.put(uploadUrl, fileBytes, {
    headers: { 'Content-Type': 'image/png' },
  });

  console.log(presignedRes.body);

  check(uploadRes, { 'upload ok': (r) => r.status === 200 });
  sleep(1);
}
