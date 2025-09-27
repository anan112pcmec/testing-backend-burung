import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,        // jumlah virtual user
    duration: '1s' // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/user/likes-barang';

    // payload harus sesuai dengan struct PayloadKomentarBarang
    const payload = JSON.stringify({
        id_barang_induk_likes: 41,
        id_user_likes: 1
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Berhasil Unggah Komentar'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);
    sleep(1)
}
