// k6 run alamat/hapus_alamat.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,       // jumlah virtual users
    duration: '30s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/alamat/hapus-alamat';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 1,
            email_kurir: "anan29837@gmail.com",
            username_kurir: "kurir_310f2592"
        },
        id_alamat_kurir: 1
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.del(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'body tidak kosong': (r) => r.body && r.body.length > 0,
    });
}
