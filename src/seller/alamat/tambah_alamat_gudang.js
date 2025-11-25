// k6 run alamat/tambah_alamat_gudang.js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '15s',
};

export default function () {
  const url = 'http://localhost:8080/seller/alamat/tambah-alamat-gudang';

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    panggilan_alamat: 'Gudang Surabaya',
    nomor_telefon: '+62 812-3456-7890',
    nama_alamat: 'Suroboyo rek',
    provinsi: 'jawa_timur',
    kota: 'surabaya',
    kode_pos: '12950',
    kode_negara: 'IDN',
    deskripsi: 'Gudang utama penyimpanan stok barang dan pengiriman domestik.',
    longitude: 112.75083,
    latitutde: -7.24917
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log(res.body);

}
