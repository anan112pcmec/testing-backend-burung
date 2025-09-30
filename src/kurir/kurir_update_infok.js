import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/kurir/informasi/edit-informasi-kendaraan';

    const payload = JSON.stringify({
        identitas_kurir:{
            id_kurir:1,
            username_kurir:"kurirmantap123",
            email_kurir:"anan29837@gmail.com",
        },
        edit_informasi_kendaraan:{
           kurir_pemiliki_informasi_kendaraan:1,
            jenis_kendaraan_kurir:"Motor",
            nama_kendaraan_kurir:"Beat Emberr 2024",
            roda_kendaraan_kurir:"2",
            informasi_stnk_kendaraan_kurir:true,
            informasi_bpkb_kendaraan_kurir:true,
            status_perizinan_kendaraan_kurir:"Mantap",
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
    sleep(1);
}
