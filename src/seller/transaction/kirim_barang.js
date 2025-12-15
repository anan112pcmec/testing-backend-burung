// k6 run transaction/kirim_barang.js
import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const url = 'http://localhost:8080/seller/transaction/kirim-barang';

    const payload = JSON.stringify({
        identitas_seller: {
            id_seller: 1,
            username_seller: 'ananapparel',
            email_seller: 'anan29837@gmail.com',
        },
        id_transaksi: 9
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
    });

    console.log(res.body);
}
