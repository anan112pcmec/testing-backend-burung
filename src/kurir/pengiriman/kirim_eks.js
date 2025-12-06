// k6 run pengiriman/kirim_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/kirim-pengiriman-eks';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 3,
            username_kurir: "kurir_db1b0b65",
            email_kurir: "ananlol156@gmail.com"
        },
        id_bid_kurir: 3,          // sesuai struct
        id_pengiriman: 7,        // IdPengirimanEks → json:"id_pengiriman"
        lokasi: "Jakarta Selatan",
        keterangan: "Kurir sedang mengirim paket ekspedisi",
        latitude: -6.2108,
        longitude: 106.8460
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
