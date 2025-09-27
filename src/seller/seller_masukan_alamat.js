import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100,
    duration: '30s',
};

export default function () {
    const url = 'http://localhost:8080/seller/alamat/masukan-alamat';

   const payloads = JSON.stringify({
        data_alamat_seller:{
            id_seller_alamat_seller:1,
            panggilan_alamat_seller:"Toko",
            nomor_telfon_alamat_seller:"082739393028",
            nama_alamat_seller:"gang haji naim",
            deskripsi_alamat_seller:"buat barang guwe",
            longitude_alamat_seller:32.778,
            latitude_alamat_seller:22.393
        }
    });


    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

  
        const res = http.post(url, payloads, params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(`→ Status: ${res.status}`);
        console.log(`→ Body: ${res.body}`);

}