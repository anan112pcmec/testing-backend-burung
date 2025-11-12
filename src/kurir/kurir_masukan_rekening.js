import http from 'k6/http';
import { check, sleep } from 'k6';

// --- Konfigurasi uji ---
export const options = {
  vus: 1,            // jumlah virtual user
  duration: '30s',   // durasi uji
};

export default function () {
  // --- URL endpoint kamu ---
  const url = 'http://localhost:8080/kurir/rekening/masukan-rekening';

  // --- Payload JSON ---
  const data = {
    identitas_kurir: {
      id_kurir: 1,
      username_kurir: "kurirmantap1234",
      email_kurir: "ananlol156@gmail.com"
    },
    nama_bank: "BCA",
    nomor_rekening: "1234567890",
    pemilik_rekening: "Faiz Hannan Hakim"
  };

  // --- Tampilkan payload dengan format rapi ---
  console.log('=== PAYLOAD JSON ===');
  console.log(JSON.stringify(data, null, 2)); // pretty print dengan indentasi
  console.log('=====================');

  // --- Kirim request ---
  const payload = JSON.stringify(data);

  // --- Header ---
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // --- Log hasil respons ---
  console.log('Response status:', res.status);
  console.log('Response body:', res.body);

  // --- Validasi response ---
  check(res, {
    'status 200': (r) => r.status === 200,
    'ada teks sukses': (r) => r.body.includes('sukses') || r.body.includes('berhasil'),
  });

}
