import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,          // jumlah virtual users
  duration: '30s', // durasi tes
};

export default function () {
  const nama_seller = "mam";
  const url = `http://localhost:8080/user/data-seller-spesified?nama=${encodeURIComponent(nama_seller)}&finalTake=0`;

  const res = http.get(url);

  // ✅ Validasi response
  const ok = check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains nama_barang_induk': (r) => r.body.includes('nama_barang_induk'),
  });

  if (!ok) {
    console.error(`❌ Request gagal untuk seller '${nama_seller}'. Status: ${res.status}`);
  }

  // ✅ Ringkasan hasil
  console.log(`
==========================
✅ Nama Seller: ${nama_seller}
Status: ${res.status}
Duration: ${res.timings.duration.toFixed(2)} ms
==========================
`);

  // ✅ Cuplikan body biar log nggak terlalu panjang
  console.log('Body (first 500 chars):');
  console.log(res.body.substring(0, 500));
  console.log('==========================');


}
