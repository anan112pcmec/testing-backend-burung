import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '20s', // durasi tes
};

const jenisList = ["Semua Barang", "Alat Tulis", "Pakaian & Fashion"];

export default function () {
    for (let i = 0; i < jenisList.length; i++) {
        const jenis = encodeURIComponent(jenisList[i]); // encode spasi & karakter khusus
        const url = `http://localhost:8080/user/barang-spesified?jenis=${jenis}`;

        const res = http.get(url);

        check(res, {
            'status is 200': (r) => r.status === 200,
            'body contains success': (r) => r.body.includes('AmbilBarangJenis'),
        });

        console.log(`✅ Jenis: ${jenis}, Response status: ${res.status}`);
        console.log(`Response body: ${res.body}`);

    }
}
