import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const url = 'http://localhost:8080/seller/alamat/tambah-alamat-gudang';

   const payloads = JSON.stringify({
    identitas_seller:{
        id_seller:1,
        username_seller:"apakah",
        email_seller:"ananlol156@gmail.com"
    },
    data_tambah_alamat_gudang:{
        id_alamat_gudang:12,
        id_seller_alamat_gudang:1,
        panggilan_alamat_gudang:"Ambil Barang",
        nomor_telfon_alamat_gudang:"082389709265",
        nama_alamat_gudang:"gudang 1",
        kode_pos_alamat_gudang:"1240",
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

   
        const res = http.post(url, payloads, params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(` → Status: ${res.status}`);
        console.log(`→ Body: ${res.body}`);
        sleep(1);
}