import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/hapus_kategori_barang';

    const payload = JSON.stringify({
        id_barang_induk_hapus_kategori: 23,
        id_seller_hapus_kategori:1,
        hapus_kategori_barang:[
            
            {
                    id_kategori_barang: 95,
                    nama_kategori_barang: "Warna_Putihnya",
                    deskripsi_kategori_barang: "Baju Versi putihnya",
                    warna_kategori_barang: "potehh",
                    stok_kategori_barang: 100,
                    harga_kategori_barang: 179000,
                    berat_gram_kategori_barang: 1500,
                    dimensi_panjang_cm_kategori_barang: 30,
                    dimensi_tinggi_cm_kategori_barang: 12,
                    sku_kategori: "SPT-001"
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
