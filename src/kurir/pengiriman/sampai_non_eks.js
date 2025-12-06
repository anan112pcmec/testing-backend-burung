// k6 run pengiriman/sampai_non_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/sampai-pengiriman-non-eks';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 2,
            username_kurir: "kurir_4d09a543",
            email_kurir: "anan29837@gmail.com"
        },
        id_bid: 1,
        id_pengiriman: 1,
        lokasi: "Jakarta Timur",
        keterangan: "Pengiriman sudah sampai",
        latitude: -6.2100,
        longitude: 106.8456
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

}
