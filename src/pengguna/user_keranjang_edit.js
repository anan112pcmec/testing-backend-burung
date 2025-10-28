import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,        // jumlah virtual user
    duration: '1s' // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/user/keranjang-barang/edit';

    // payload harus sesuai dengan struct PayloadKomentarBarang
    const payload = JSON.stringify({
          id_pengguna_keranjang:1,
          id_barang_induk_keranjang: 5,
          id_kategori_barang_keranjang: 5,
         data_payload_edit_keranjang:20
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('Berhasil Unggah Komentar'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
