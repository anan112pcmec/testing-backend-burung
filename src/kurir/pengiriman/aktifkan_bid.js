// k6 run pengiriman/aktifkan_bid.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/aktifkan-bid';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 2,
            username_kurir: "kurir_4d09a543",
            email_kurir: "anan29837@gmail.com"
        },
        jenis_pengiriman: "Instant",
        mode: "manual",
        provinsi: "dki_jakarta",
        kota: "jakarta barat",
        alamat: "Jl. Meruya Selatan No. 12",
        longitude: 106.7438,
        latitude: -6.2019,
        max_kg: 15
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
