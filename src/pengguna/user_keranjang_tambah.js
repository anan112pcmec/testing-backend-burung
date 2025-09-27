import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,        // jumlah virtual user
    duration: '5s' // durasi tes
};

export default function () {
    let url = 'http://localhost:8080/user/keranjang-barang/tambah';

    const payload = JSON.stringify({
        data_payload_tambah_keranjang: {
          id_pengguna_keranjang:1,
          id_seller_barang_induk_keranjang:1,
          id_barang_induk_keranjang: 73,
          id_kategori_barang_keranjang: 76,
          count_keranjang: 12,
          status_keranjang: "Unready"
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
        'body contains success': (r) => r.body.includes('Berhasil Unggah Komentar'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
