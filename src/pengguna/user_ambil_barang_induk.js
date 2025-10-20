import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // durasi test
};
export default function () {
    // loop untuk id_barang_induk dari 22 sampai 48
    let id = 6; // contoh, nanti bisa diganti loop
    let url = `http://localhost:8080/user/data-barang-induk?barang_induk=${id}`;
    let res = http.get(url);

    // cek status dan payload
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has payload': (r) => r.body.includes('payload') || r.body.length > 0,
    });

    // parse JSON dan log payload
    try {
        let data = JSON.parse(res.body);
        console.log(JSON.stringify(data, null, 2)); // pretty-print JSON
    } catch (e) {
        console.log('⚠️ Gagal parse JSON:', e);
        console.log('Raw body:', res.body);
    }

}

