import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8080/seller/alamat/tambah-alamat-gudang';

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    panggilan_alamat: 'Gudang Utama',
    nomor_telefon: '+62 812-3456-7890',
    nama_alamat: 'Gudang Pusat Anan Apparel Indonesia',
    kota: 'Jakarta Selatan',
    kode_pos: '12950',
    kode_negara: 'IDN',
    deskripsi: 'Gudang utama penyimpanan stok barang dan pengiriman domestik.',
    longitude: 10.682,
    latitutde: -6.21
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  try {
    console.log(JSON.stringify(JSON.parse(res.body), null, 2));
  } catch {
    console.log(res.body);
  }

}
