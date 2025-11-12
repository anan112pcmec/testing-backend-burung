import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,       // jumlah virtual users
    duration: '30s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kurir';

    const payload = JSON.stringify({
        identitas_kurir:{
           id_kurir: 1,
            username_kurir: "kurirmantap1234",
            email_kurir: "ananlol156@gmail.com"
        },
         tanggal_lahir: "1998-12-05",
            alasan: "Ingin memperbarui data dan menambahkan dokumen SIM",
            informasi_ktp: true,
            informasi_sim: true
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
