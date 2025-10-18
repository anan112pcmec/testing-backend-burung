import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,          // jumlah virtual users
    duration: '30s', // durasi tes
};

export default function () {
    const jenis_seller = "Brands";
    const url = `http://localhost:8080/user/data-seller-spesified?jenis=${encodeURIComponent(jenis_seller)}&finalTake=0`;

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
        
    });

    console.log('==========================');
    console.log(res.body.substring(0, 500));
    console.log('==========================');

    // kalau kamu mau lihat seluruh objek response:
    // console.log(JSON.stringify(res, null, 2));

}
