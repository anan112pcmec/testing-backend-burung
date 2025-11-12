import http from 'k6/http';
import { check, sleep } from 'k6';

// --- Konfigurasi Load Test ---
export const options = {
  vus: 1,            // jumlah virtual user
  duration: '30s',   // durasi test
};

export default function () {
  // --- URL endpoint ---
  const url = 'http://localhost:8080/kurir/rekening/hapus-rekening';

  // --- Payload JSON ---
  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 1,
      username_kurir: "kurirmantap1234",
      email_kurir: "ananlol156@gmail.com"
    },
    id_rekening: 1         // rekening yang ingin dihapus
  });

  // --- Header ---
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // --- Kirim Request ---
  const res = http.del(url, payload, params);

  // --- Tampilkan response sebagai objek ---
  console.log("Response objek:", JSON.stringify({
    status: res.status,
    body: JSON.parse(res.body)
  }, null, 2));

  // --- Validasi hasil ---
  check(res, {
    'status 200': (r) => r.status === 200,
    'hapus sukses': (r) => r.body.includes('sukses') || r.body.includes('berhasil'),
  });

}
