import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/ambil-pengiriman';

    const payload = JSON.stringify({
       data_kredensial_kurir:{
        id_kurir:11,
        username_kurir:"kurirjomok",
        email_kurir:"anan29837@gmail.com",
       },
       data_pengiriman:[{
        id_pengiriman:4,
        id_transaksi_pengiriman:4,
        id_alamat_pengiriman:3,
        id_kurir_pengiriman:0,
        nomor_resi_pengiriman:"NUPG-09009-K9ML4G",
        layanan_pengiriman:"motor",
        jenis_pengiriman_transaksi:"reguler",
        status_pengiriman:"Packaging",
        biaya_kirim_pengiriman:5000,
        kurir_paid_pengiriman:12000,
        berat_total_kg_pengiriman:18,
       },
       {
         id_pengiriman:5,
        id_transaksi_pengiriman:3,
        id_alamat_pengiriman:3,
        id_kurir_pengiriman:0,
        nomor_resi_pengiriman:"NUPG-09009-K9ML4G",
        layanan_pengiriman:"motor",
        jenis_pengiriman_transaksi:"reguler",
        status_pengiriman:"Packaging",
        biaya_kirim_pengiriman:5000,
        kurir_paid_pengiriman:12000,
        berat_total_kg_pengiriman:18,
       }
    ]
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Silahkan Masukan Kode OTP yang sudah di kirimkan ke Gmail Anda'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
