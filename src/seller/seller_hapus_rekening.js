import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       
    duration: '1s', 
};

export default function () {
    const url = 'http://localhost:8080/seller/credential/hapus-rekening';

    const payload = JSON.stringify({
       id_seller_hapus_rekening:1,
       nama_bank_hapus_rekening:"BCA",
       nomor_rekening_hapus_rekening:"8179739238",
       pemilik_rekening_hapus_rekening:"Fa"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.del(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('User berhasil didaftarkan') || r.body.includes('Seller berhasil didaftarkan'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);

    sleep(1);
}
