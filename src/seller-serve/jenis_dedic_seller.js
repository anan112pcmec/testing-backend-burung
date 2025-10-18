import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,          // jumlah virtual users
    duration: '30s', // durasi tes
};

export default function () {
    const jenis_seller = "Semua Barang";
    const nama_seller = "mam";
    const url = `http://localhost:8080/user/data-seller-spesified?dedication=${encodeURIComponent(jenis_seller)}&nama=${encodeURIComponent(nama_seller)}&finalTake=0`;

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 100ms': (r) => r.timings.duration < 100,
    });

    console.log('==========================');
    console.log(`Response time: ${res.timings.duration} ms`);
    console.log(res.body.substring(0, 500));
    console.log('==========================');

}
