import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/hapus_kategori_barang';

    const payload = JSON.stringify({
        identitas_seller:{
            id_seller:1,
            username_seller:"apakah",
            email_seller:"ananlol156@gmail.com"
        },
        id_barang_induk_hapus_kategori: 4,
        hapus_kategori_barang:[
            {
                    id_kategori_barang: 4,
                    nama_kategori_barang: "Hitam",
                    deskripsi_kategori_barang: "Topi snapback dengan bahan katun berkualitas tinggi",
                    warna_kategori_barang: "Hitam",
                    stok_kategori_barang: 40,
                    harga_kategori_barang: 320000,
                    berat_gram_kategori_barang: 180,
                    dimensi_panjang_cm_kategori_barang: 18,
                    dimensi_tinggi_cm_kategori_barang: 10,
                    sku_kategori: "TP-005"
            },

        ]
        
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
