// k6 run profiling/profiling_general.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,       // jumlah virtual users
    duration: '3s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/profiling/general-update';

    const payload = JSON.stringify({
         identitas_kurir: {
            id_kurir: 1,
            email_kurir: "faizbaru@mail.com",
            username_kurir: "faizkurirbaru"
        },
        ubah_deskripsi_kurir: "Kurir profesional dengan pengalaman 5 tahun"
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

    console.log(res.body);

    sleep(1);
}
