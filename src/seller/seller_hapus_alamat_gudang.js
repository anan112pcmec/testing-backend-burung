import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const url = 'http://localhost:8080/seller/alamat/hapus-alamat-gudang';

   const payloads = JSON.stringify({
    data_identitas_seller:{
        id_seller:1,
        username_seller:"adidas",
        email_seller:"anan29837@gmail.com"
    },
    id_alamat_gudang:2
  });


    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

   
        const res = http.del(url, payloads, params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(` → Status: ${res.status}`);
        console.log(`→ Body: ${res.body}`);
        sleep(1);
}