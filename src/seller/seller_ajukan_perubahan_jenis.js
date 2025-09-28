import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/jenis/ajukan-perubahan';

    const payload = JSON.stringify({
       data_identitas_seller:{
        id_seller:1,
        username_seller:"adidas",
        email_seller:"anan29837@gmail.com",
       },
       data_diajukan_ubah_jenis_seller:{
        id_jenis_seller:0,
        id_seller_jenis_seller:1,
        validation_status_jenis_seller:"Ready",
        alasan_seller_jenis_seller:"shbsxkbxkjskxbxkjbxsxkj",
        alasan_admin_jenis_seller:"xsxbkxb",
        target_jenis_seller:"Brands",
       }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan') || r.body.includes('Seller berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
