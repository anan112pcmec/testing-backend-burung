import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/hapus_barang';

    const payload = JSON.stringify({
        identitas_seller:{
            id_seller:1,
            username_seller:"apakah",
            email_seller:"ananlol156@gmail.com"
        },
        barang_induk_hapus: {
            id_barang_induk: 2,
            nama_barang_induk: "Jersey Bola Manchester United 2025",
            jenis_barang_induk: "Semua Barang",
            deskripsi_barang_induk: "Bola voli resmi dengan kualitas turnamen",
            tanggal_rilis_barang_induk: "2025-09-11"
        }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.del(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan') || r.body.includes('Seller berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
