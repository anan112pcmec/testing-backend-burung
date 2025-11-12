import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi tes
};

export default function () {
    let url = `http://localhost:8080/user/komentar-child/edit`;

    const payload = JSON.stringify({
        identitas_pengguna:{
            id_pengguna:1,
            username_pengguna:"ananan",
            email_pengguna:"anan29837.@gmail.com"
        },
        id_child_komentar:3,
        komentar_child_komentar:"Bismillah"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // ✅ urutan argumen bener
    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Berhasil'), // sesuaikan dengan response API kamu
    });

    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);
    sleep(1)
}
