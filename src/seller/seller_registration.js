import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '5s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/auth/seller/registration';

    const payload = JSON.stringify({
        username_seller: "apakah",
        nama_seller: "mamam",
        email_seller: "ananlol156@gmail.com",
        pass_seller: "StrongPassword123",
        jenis_seller: "Personal",           // bisa Personal atau Perusahaan
        seller_dedication: "Semua Barang",  // default bisa dikirim
        jam_operasional_seller: "08:00-17:00",
        punchline_seller: "Terbaik di kelasnya",
        deskripsi_seller: "Seller yang handal",
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan') || r.body.includes('Seller berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
