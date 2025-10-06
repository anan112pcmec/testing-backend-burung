import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  const urlCheckout = 'http://localhost:8080/user/transaksi/checkout-barang';
  const urlBatal = 'http://localhost:8080/user/transaksi/batal-checkout-barang';

  const payloadCheckout = JSON.stringify({
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
  jenis_layanan_kurir_checkout_barang: ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Kirim POST request checkout
  const resCheckout = http.post(urlCheckout, payloadCheckout, params);
  check(resCheckout, { 'checkout status is 200': (r) => r.status === 200 });
  console.log('Checkout Response:', resCheckout.body);

  sleep(1);

  const bodyCheckout = JSON.parse(resCheckout.body);
  const payloadBatal = JSON.stringify(bodyCheckout.response_payload);
  const resBatal = http.request('DELETE', urlBatal, payloadBatal, params);

  check(resBatal, { 'batal status is 200': (r) => r.status === 200 });
  console.log('Batal Checkout Response:', resBatal.body);

  sleep(0.4)
}