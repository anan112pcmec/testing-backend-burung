// k6 run transaction/approve_order.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const url = 'http://localhost:8080/seller/transaction/approve-order';

    // bikin tanggal sekarang tapi jam 12:00
    const now = new Date();
    now.setHours(12, 0, 0, 0); // jam 12:00:00
    const waktuAuto = now.toISOString(); 

    const payload = JSON.stringify({
        identitas_seller: {
            id_seller: 1,
            username_seller: 'ananapparel',
            email_seller: 'anan29837@gmail.com',
        },
        id_transaksi: 9,
        catatan_approve: "Pesanan disetujui",
        auto_pengiriman: false,
        waktu_auto_pengiriman: waktuAuto
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    console.log("WAKTU AUTO:", waktuAuto);
    console.log(res.body);

    sleep(1);
}
