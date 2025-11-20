// k6 run alamat/masukan_alamat.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
};

export default function () {
    const url = 'http://localhost:8080/kurir/alamat/masukan-alamat';

    const payload = JSON.stringify({
        identitas_kurir: {
            id_kurir: 1,
            email_kurir: "anan29837@gmail.com",
            username_kurir: "kurir_310f2592"
        },
        panggilan_alamat: "Rumah",
        nomor_telephone: "081234567890",
        nama_alamat: "Alamat Utama",
        kota: "Jakarta",
        kode_negara: "ID",
        kode_pos: "12345",
        deskripsi: "Alamat utama kurir",
        longtitude: 106.84513,
        latitude: -6.21462
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'body tidak kosong': (r) => r.body && r.body.length > 0,
    });

    console.log(res.body);
}
