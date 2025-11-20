// k6 run profiling/profiling_personal.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/profiling/personal-update';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 1,
            email_kurir: "anan29837@gmail.com",
            username_kurir: "faizkurirbaru"
        },
        ubah_username_kurir: "",
        ubah_nama_kurir: "",
        ubah_email_kurir: "faizbaru@mail.com"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'body tidak kosong': (r) => r.body && r.body.length > 0,
    });

    sleep(1);

}
