import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '10s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/edit-informasi-kurir';

    const payload = JSON.stringify({
        identitas_kurir:{
            id_kurir:1,
            username_kurir:"kurirmantap123",
            email_kurir:"anan29837@gmail.com",
        },
        edit_informasi_kurir:{
           informasi_id_kurir:1,
            informasi_umur_kurir:25,
            informasi_alasan_kurir:"ealah si koboy",
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

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);
}
