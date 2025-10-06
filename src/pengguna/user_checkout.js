import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '1s',
};

const urlCheckout = 'http://localhost:8080/user/transaksi/checkout-barang';

const payloadCheckout = {
  data_identitas_pengguna:{
        id_pengguna:1,
        username_pengguna:"user1",
        email_pengguna:"ananlol156@gmail.com"
      },
  data_checkout: [
    {
      id_pengguna_keranjang: 1,
      id_barang_induk_keranjang: 61,
      id_seller_barang_induk_keranjang:1,
      id_kategori_barang_keranjang: 64,
      count_keranjang: 10,
      status_keranjang: "Ready",
    }
  ],
  jenis_layanan_kurir_checkout_barang: "reguler"
};

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  const res = http.post(urlCheckout, JSON.stringify(payloadCheckout), params);

  // Parse body JSON -> jadi objek
  let bodyObj;
  try {
    bodyObj = JSON.parse(res.body);
  } catch (e) {
    bodyObj = { error: "Response bukan JSON valid", raw: res.body };
  }

  // Validasi response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has success message': (r) =>
      bodyObj.message && bodyObj.message.includes('Berhasil'),
  });

  // Console log objek jelas
  console.log('Response body object:', JSON.stringify(bodyObj, null, 2));

  sleep(1);
}
