import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // durasi tes
};

export default function () {
    let url = `http://localhost:8080/user/alamat/membuat-alamat`;

    const payload = JSON.stringify({
       data_alamat_pengguna: {
            id_pengguna_alamat_user: 1,
            panggilan_alamat_user: "Rumah",
            nomor_telfon_alamat_user: "081389709265",
            nama_alamat_user: "jl.haju.mungkir",
            deskripsi_alamat_user: "rumah saya",
            kota_alamat_user: "jakarta",
            kode_pos_alamat_user:"3140",
            kode_negara_alamat_user:"",
            longitude_alamat_user: 12.9722,
            latitude_alamat_user: 12.32903   
       }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // ✅ urutan argumen bener
    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Berhasil'), // sesuaikan dengan response API kamu
    });

    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);
    sleep(1)
}
