// k6 run rekening/hapus_rekening.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/rekening/hapus-rekening';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 1,
            email_kurir: "faizbaru@mail.com",
            username_kurir: "faizkurirbaru"
        },
        id_rekening: 1
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

    console.log(res.body)

}
