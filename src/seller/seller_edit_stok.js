import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/edit/stok-barang';

    const payload = JSON.stringify({
        identitas_seller:{
            id_seller:1,
            username_seller:"apakah",
            email_seller:"ananlol156@gmail.com"
        },
        id_barang_induk_stok_edit: 2,
        stok_barang_edit:[
            {
                id_kategori_barang_edit_stok: 5,
                nama_kategori_barang_edit_stok: "Semua Barang",
                sku_kategori_barang: "SPT-829",
                jumlah_stok: 100
            }
        ]
        
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
