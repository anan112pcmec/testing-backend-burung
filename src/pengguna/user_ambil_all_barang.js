import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/seller/barang-all?finalTake=10';
    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);

    // parse JSON dulu
    let data;
    try {
        data = JSON.parse(res.body);
        console.log('Response body as object:');
        console.log(JSON.stringify(data, null, 2)); // prettier print
    } catch (e) {
        console.log('Gagal parse JSON:', e);
        console.log(res.body); // fallback
    }

}
