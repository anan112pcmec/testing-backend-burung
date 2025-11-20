// k6 run credential/validate_pass.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,       // jumlah virtual users
    duration: '3s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/credential/validate-ubah-pass-otp';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 1,
            email_kurir: "anan29837@gmail.com",
            username_kurir: "kurir_310f2592"
        },
        otp_key_ubah_password: "36413905"
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

}
