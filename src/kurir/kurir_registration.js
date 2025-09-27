import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '5s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/auth/kurir/registration';

    const payload = JSON.stringify({
        nama_kurir: "kurir1",
        username_kurir:"kurirmantap123",
        email_kurir: "anan29837@gmail.com",
        pass_kurir: "mantap123le"
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
