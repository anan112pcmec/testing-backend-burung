// k6 run pengiriman/update_informasi_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/update-informasi-pengiriman-eks';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 3,
            username_kurir: "kurir_db1b0b65",
            email_kurir: "ananlol156@gmail.com"
        },
        id_bid: 1,
        id_pengiriman_eks: 10,
        lokasi: "Jakarta Timur",
        keterangan: "Kurir sedang dalam perjalanan membawa paket ekspedisi",
        latitude: -6.2112,
        longitude: 106.8463
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
