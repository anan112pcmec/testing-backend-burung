import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kurir';

    const payload = JSON.stringify({
        identitas_kurir:{
            id_kurir:1,
            username_kurir:"kurirmantap123",
            email_kurir:"anan29837@gmail.com",
        },
        informasi_kurir:{
            informasi_id_kurir:1,
            informasi_umur_kurir:25,
            informasi_alasan_kurir:"Mau Cari Nafkah",
            informasi_ktp_kurir:true,
            informasi_alamat_kurir:"jalan buni no 5",
            status_perizinan_kendaraan_kurir:"Keren",
        }
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

}
