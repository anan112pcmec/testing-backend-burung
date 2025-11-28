// k6 run informasi/edit_informasi_kendaraan.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,            // jumlah virtual user
    duration: '3s',    // durasi test
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/edit-informasi-kendaraan';

    const payload = JSON.stringify({
       identitas_kurir: {
            id_kurir: 2,
            username_kurir: "kurir_4d09a543",
            email_kurir: "anan29837@gmail.com"
        },
        id_informasi_kendaraan: 1,
        jenis_kendaraan: "Motor",
        nama_kendaraan: "Honda Vario",
        roda_kendaraan: "2",
        informasi_stnk: true,
        informasi_bpkb: false,
        nomor_rangka: "MH12ABCD1234567",
        nomor_mesin: "EN987654321"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'body tidak kosong': (r) => r.body && r.body.length > 0,
    });

    console.log(res.body);
    sleep(1);
}
