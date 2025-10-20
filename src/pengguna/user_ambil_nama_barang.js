import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '20s', // durasi tes
};


export default function () {

        const nama_barang = "Voli"; // encode spasi & karakter khusus
        const url = `http://localhost:8080/user/barang-spesified?nama_barang=${nama_barang}&finalTake=0`;

        const res = http.get(url);

        check(res, {
            'status is 200': (r) => r.status === 200,
            'body contains success': (r) => r.body.includes('nama_barang_induk'),
        });

        console.log(`✅ Jenis: ${nama_barang}, Response status: ${res.status}`);
        console.log(`Response body: ${res.body}`);

    }

