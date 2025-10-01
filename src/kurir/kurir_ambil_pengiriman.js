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
        id_kurir:1,
        username_kurir:"kurirmantap123",
        email_kurir:"anan29837@gmail.com",
       },
       data_pengiriman:[{
        id_pengiriman:12,
        id_transaksi_pengiriman:2,
        id_alamat_pengiriman:3,
        id_kurir_pengiriman:0,
        nomor_resi_pengiriman:"GXTM-01181-YOCFT0",
        layanan_pengiriman:"Mobil",
        jenis_pengiriman_transaksi:"reguler",
        status_pengiriman:"Packaging",
        biaya_kirim_pengiriman:5000,
        kurir_paid_pengiriman:12000,
        berat_total_kg_pengiriman:18,
       },
       {
         id_pengiriman:13,
        id_transaksi_pengiriman:1,
        id_alamat_pengiriman:3,
        id_kurir_pengiriman:0,
        nomor_resi_pengiriman:"GXTM-01181-YOCFT0",
        layanan_pengiriman:"Mobil",
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
