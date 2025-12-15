// k6 run pengiriman/kirim_non_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/kirim-pengiriman-non-eks';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 2,
            username_kurir: "kurir_4d09a543",
            email_kurir: "anan29837@gmail.com"
        },
        id_bid: 1,
        id_pengiriman: 2,
        lokasi: "Jakarta Selatan",
        keterangan: "Pengiriman selesai dikirim",
        latitude: -6.2762,
        longitude: 106.8272
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
