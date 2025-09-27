import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/order-processing/approve';

    const payload = JSON.stringify({
       seller_credential_order_approve:{
            id_seller:1,
            username_seller:"adidas",
            email_seller:"anan29837@gmail.com"
       },
       seller_transaksi_order_approve:[
        {
            id_transaksi: 1,
            id_pengguna_transaksi: 1,
            id_seller_transaksi: 1,
            id_barang_induk_transaksi: 73,
            id_alamat_pengguna_transaksi: 3,
            id_pembayaran_transaksi: 2,
            kode_order_transaksi: "NUPG-09009-K9ML4G",
            status_transaksi: "Dibayar",
            metode_transaksi: "bank_transfer",
            catatan_transaksi: "",
            kuantitas_barang_transaksi: 20,
            total_transaksi: 3200000,
        },
        {
            id_transaksi: 1,
            id_pengguna_transaksi: 1,
            id_seller_transaksi: 1,
            id_barang_induk_transaksi: 23,
            id_alamat_pengguna_transaksi: 3,
            id_pembayaran_transaksi: 2,
            kode_order_transaksi: "NUPG-09009-K9ML4G",
            status_transaksi: "Dibayar",
            metode_transaksi: "bank_transfer",
            catatan_transaksi: "",
            kuantitas_barang_transaksi: 20,
            total_transaksi: 5000000,
        }
       ]
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

     // cek status dan payload
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has payload': (r) => r.body.includes('payload') || r.body.length > 0,
    });

    // parse JSON dan log payload
    try {
        let data = JSON.parse(res.body);
        console.log(JSON.stringify(data, null, 2)); // pretty-print JSON
    } catch (e) {
        console.log('⚠️ Gagal parse JSON:', e);
        console.log('Raw body:', res.body);
    }

    sleep(1);
}
