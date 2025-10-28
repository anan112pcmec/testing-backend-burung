import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '3s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/auth/user/registration';

    const payload = JSON.stringify({
        username_user: "an",
        nama_user: "as",
        email_user: "anan2978.rpl2@smkprestasiprima.sch.id",
        pass_user: "mantap123"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Silahkan Masukan Kode OTP yang sudah di kirimkan ke Gmail Anda'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
