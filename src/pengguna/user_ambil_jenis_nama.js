import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 1,
    duration: '30s',
};

export default function () {
    const nama_barang = "Rompi";
    const jenis = "Semua Barang";
    const seller = "";

    let url = `http://localhost:8080/user/barang-spesified?nama_barang=${encodeURIComponent(nama_barang)}&jenis=${encodeURIComponent(jenis)}`;
    if (seller.trim() !== "") {
        url += `&seller=${encodeURIComponent(seller)}`;
    }

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // ini aja cukup, tampilkan seluruh objek response-nya
    console.log(JSON.stringify(res.body, null, 2));
}
