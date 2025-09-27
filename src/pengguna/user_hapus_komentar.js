import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,        // jumlah virtual user
    duration: '1s' // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/user/komentar-barang/hapus';

    // payload harus sesuai dengan struct PayloadKomentarBarang
    const payload = JSON.stringify({
       id_komentar_hapus_komentar:21,
       id_user_hapus_komentar:1,
       id_barang_induk_hapus_komentar:40,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.del(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('status:200'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);
    sleep(1);

}
