import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // jumlah virtual user
  iterations: 1, // hanya dijalankan 1 kali
};

export default function () {
  const url = 'http://localhost:8080/seller/edit_kategori_barang'; // ubah sesuai endpoint server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    id_barang_induk_edit_kategori: 2,
    id_kategori_barang: 6, // ID kategori yang ingin di-edit
    nama: "Kemeja Linen Super",
    deskripsi: "Kemeja linen dengan kualitas premium, ringan, dan nyaman untuk cuaca tropis.",
    warna: "Biru Laut",
    dimensi_panjang: 29,
    dimensi_lebar: 19,
    sku: "KMJ-LNN-BRLT-03"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.patch(url, payload, params);

  // tampilkan isi body response di terminal
  console.log("Response Body:");
  console.log(res.body);

  // verifikasi hasilnya
  check(res, {
    'status code 200': (r) => r.status === 200,
    'response tidak kosong': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
