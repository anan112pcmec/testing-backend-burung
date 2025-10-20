import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const nama_barang = "Adidas";
    const jenis = "Semua Barang";
    const seller = "";

    let url = `http://localhost:8080/user/barang-spesified?nama_barang=${encodeURIComponent(nama_barang)}&jenis=${encodeURIComponent(jenis)}&finalTake=0`;
    if (seller.trim() !== "") {
        url += `&seller=${encodeURIComponent(seller)}`;
    }

    const res = http.get(url);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // tampilkan response sebagai object
    console.log(JSON.stringify(JSON.parse(res.body), null, 2));
}
