import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const url = 'http://localhost:8080/seller/alamat/edit-alamat-gudang';

   const payloads = JSON.stringify({
    data_identitas_seller:{
        id_seller:1,
        username_seller:"adidas",
        email_seller:"anan29837@gmail.com"
    },
    data_edit_alamat_gudang:{
        id_alamat_gudang:2,
        id_seller_alamat_gudang:1,
        panggilan_alamat_gudang:"Bajunya disini",
        nomor_telfon_alamat_gudang:"082389709265",
        nama_alamat_gudang:"gudang 2",
        kode_pos_alamat_gudang:"12903",
        kota_alamat_gudang:"JKT",
        kode_negara_alamat_gudang:"IDN",
        deskripsi_alamat_gudang:"makan atap mantap",
        longitude_alamat_gudang: 12.97220000,
        latitude_alamat_gudang: 12.32903000
    }
  });


    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

   
        const res = http.patch(url, payloads, params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(` → Status: ${res.status}`);
        console.log(`→ Body: ${res.body}`);
        sleep(1);
}