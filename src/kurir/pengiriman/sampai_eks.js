// k6 run pengiriman/sampai_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/sampai-pengiriman-eks';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 3,
            username_kurir: "kurir_db1b0b65",
            email_kurir: "ananlol156@gmail.com"
        },
        id_bid_kurir: 3,
        id_pengiriman: 7, // json tag: id_pengiriman
        no_resi_ekspedisi:"JBCS-832-XAUWBDC972",
        lokasi: "Jakarta Selatan",
        keterangan: "Kurir telah sampai di lokasi penerima",
        latitude: -6.2105,
        longitude: 106.8457
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
