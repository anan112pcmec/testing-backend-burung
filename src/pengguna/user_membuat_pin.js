import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/user/credential/membuat-pin';

    const payload = JSON.stringify({
       id_user_membuat_pin: 1,
       username_user_membuat_pin: "user1",
       password_user_membuat_pin: "keren123",
       pin_user_membuat_pin: "120076"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

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

    sleep(1);
}
