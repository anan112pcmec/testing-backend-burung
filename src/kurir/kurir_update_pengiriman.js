import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/pengiriman/update-pengiriman';

    const payload = JSON.stringify({
        data_informasi_kurir:{
             id_kurir:1,
        username_kurir:"kurirmantap123",
        email_kurir:"anan29837@gmail.com",
        },
        id_pengiriman:12,
        data_jejak_pengiriman:{
            id_pengiriman_jejak_pengiriman:12,
            lokasi_jejak_pengiriman:"Jalan hj Prapatan",
            keterangan_jejak_pengiriman:"Barang Di Ambil"
        },
        status_pengiriman:"Picked Up"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);
    sleep(1);
}
