import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '3s',
};

export default function () {
    const url = 'http://localhost:8080/seller/credential/tambah-rekening';

   const payloads = JSON.stringify({
    identitas_seller:{
            id_seller:1,
            username_seller:"apakah",
            email_seller:"ananlol156@gmail.com"
        },
    data_rekening_seller:{
        id_seller:1,
        nama_bank_rekening_seller: "MANDIRI",
        nomor_rekening_seller: "817973923888",
        pemilik_rekening_seller: "Faiz",
        is_default_rekening_seller: true,
        status_rekening_seller: "pending"
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

        console.log(` → Status: ${res.status}`);
        console.log(`→ Body: ${res.body}`);


}