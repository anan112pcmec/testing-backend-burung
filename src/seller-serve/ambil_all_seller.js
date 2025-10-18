import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,          // jumlah virtual users
    duration: '20s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/user/data-seller-all?finalTake=3';

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains AmbilBarangJenis': (r) => r.body.includes('AmbilBarangJenis'),
    });

    // Tampilkan ringkasan respons
    console.log('=== Response Info ===');
    console.log(`Status: ${res.status}`);
    console.log(`Duration: ${res.timings.duration} ms`);
    console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);

    // Tampilkan sebagian isi body (hindari terlalu panjang)
    console.log(`Body (first 500 chars): ${res.body.substring(0, 500)}`);

    // Jika mau lihat seluruh object (tidak disarankan jika besar)
    // console.log(JSON.stringify(res, null, 2));

}
// k6 run ambil_all_seller.js