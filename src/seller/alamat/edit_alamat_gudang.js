// k6 run alamat/edit_alamat_gudang.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,          // jumlah virtual user
  duration: '30s',  // durasi test
};

export default function () {
  const url = 'http://localhost:8080/seller/alamat/edit-alamat-gudang';

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_alamat_gudang: 1,
    panggilan_alamat: "Gudang Satu",
    nomor_telefon: "+62 812-8970-7890",
    nama_alamat: "Gudang Pusat Anan Apparel Indonesia",
    provinsi: "banten",
    kota: "serang",
    kode_pos: "12950",
    kode_negara: "IDN",
    deskripsi: "Perubahan alamat gudang pusat untuk optimalisasi distribusi dan penyimpanan barang.",
    longitude: 105.682,
    latitutde: -6.21
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.patch(url, payload, params);

  console.log(`Response: ${res.body}`);

  check(res, {
    'status 200': (r) => r.status === 200,
  });

}
