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
            id_kurir: 3,
            username_kurir: "kurir_db1b0b65",
            email_kurir: "ananlol156@gmail.com"
        },
        jenis_pengiriman: "Reguler",
        mode: "manual",
        provinsi: "dki_jakarta",
        kota: "jakarta barat",
        is_ekspedisi:true,
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
