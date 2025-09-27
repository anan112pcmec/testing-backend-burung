import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/hapus_barang';

    const payload = JSON.stringify({
        id_seller: 1,
        barang_induk_hapus: {
            nama_barang_induk: "Legging",
            jenis_barang_induk: "Pakaian & Fashion",
            deskripsi_barang_induk: "Baju buat lari adidas",
            tanggal_rilis_barang_induk: "12-08-2025"
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
