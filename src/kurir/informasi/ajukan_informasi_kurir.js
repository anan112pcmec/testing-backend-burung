// k6 run informasi/ajukan_informasi_kurir.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,            // jumlah virtual user
    duration: '3s',    // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kurir';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 2,
            username_kurir: "kurir_4d09a543",
            email_kurir: "anan29837@gmail.com"
        },
        tanggal_lahir: "1998-05-20",
        alasan: "Melengkapi data kurir untuk keperluan verifikasi.",
        informasi_ktp: true,
        informasi_sim: false
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'body tidak kosong': (r) => r.body && r.body.length > 0,
    });

    console.log(res.body);
    sleep(1);
}
