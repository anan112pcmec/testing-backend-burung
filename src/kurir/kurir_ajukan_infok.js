import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '30s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/ajukan-informasi-kendaraan';

    const payload = JSON.stringify({
        identitas_kurir:{
            id_kurir: 1,
            username_kurir: "kurirmantap1234",
            email_kurir: "ananlol156@gmail.com"
        },
       jenis_kendaraan: "Motor",
        nama_kendaraan: "Honda Beat Street",
        roda_kendaraan: "2",
        informasi_stnk: true,
        informasi_bpkb: true,
        nomor_rangka: "MH12345XYZ67890",
        nomor_mesin: "ENG98765XYZ12345",
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
