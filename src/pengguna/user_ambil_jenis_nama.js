import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '30s', // durasi tes
};

export default function () {
    const nama_barang = encodeURIComponent("Rompi"); // encode spasi & karakter khusus
    const jenis = encodeURIComponent("Semua Barang");
    const seller = ""; // kosong jika tidak ingin pakai seller

    // Susun URL dengan parameter yang ada
    let url = `http://localhost:8080/user/barang-spesified?nama_barang=${nama_barang}&jenis=${jenis}`;
    if (seller !== "") {
        url += `&seller=${seller}`;
    }

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('SellerServices'),
    });

    console.log(`✅ Nama Barang: ${nama_barang}, Jenis: ${jenis}, Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);
    sleep(1)
}