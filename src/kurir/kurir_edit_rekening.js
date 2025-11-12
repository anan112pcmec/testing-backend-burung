import http from 'k6/http';
import { check, sleep } from 'k6';

// --- Konfigurasi test ---
export const options = {
  vus: 1,            // jumlah virtual user
  duration: '30s',   // durasi test
};

export default function () {
  // --- Endpoint ---
  const url = 'http://localhost:8080/kurir/rekening/edit-rekening';

  // --- Payload JSON ---
  const payload = JSON.stringify({
    identitas_kurir: {
       id_kurir: 1,
      username_kurir: "kurirmantap1234",
      email_kurir: "ananlol156@gmail.com"
    },
    id_rekening: 2,           // id rekening yang mau diedit
    nama_bank: "Bank BRI",
    nomor_rekening: "1234567890",
    pemilik_rekening: "anancuyman"
  });

  // --- Header ---
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // --- Kirim request ---
  const res = http.patch(url, payload, params);

  // --- Console log hasil dalam bentuk objek JSON jelas ---
  console.log("Response objek:", JSON.stringify({
    status: res.status,
    body: JSON.parse(res.body)
  }, null, 2));

  // --- Validasi dasar ---
  check(res, {
    'status 200': (r) => r.status === 200,
    'edit sukses': (r) => r.body.includes('sukses') || r.body.includes('berhasil'),
  });

}
