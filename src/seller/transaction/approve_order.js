// k6 run transaction/approve_order.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // jumlah virtual users
    duration: '10s', // durasi test
};

export default function () {
    const url = 'http://localhost:8080/seller/transaction/approve-order'; // ganti sesuai base URL backend kamu
    const payload = JSON.stringify({
        identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
        id_transaksi: 5,
        catatan_approve: "Pesanan disetujui"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has success': (r) => r.body.includes('success') || r.status === 200,
    });

    console.log(res.body); // untuk inspect response

}
