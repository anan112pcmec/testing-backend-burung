import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const urlCheckout = 'http://localhost:8080/user/transaksi/checkout-barang';
  const urlBatal = 'http://localhost:8080/user/transaksi/batal-checkout-barang';

  const payloadCheckout = JSON.stringify({
    id_pengguna_checkout_barang: 1,
    username_pengguna_checkout_barang: "user1",
    data_checkout: [
      {
        id_pengguna_keranjang: 1,
        id_barang_induk_keranjang: 73,
        id_kategori_barang_keranjang: 76,
        count_keranjang: 20,
        status_keranjang: "Ready",
      }
    ]
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

  // Ambil hanya response_payload dari body
  const bodyCheckout = JSON.parse(resCheckout.body);
  const payloadBatal = JSON.stringify(bodyCheckout.response_payload);

  // Kirim DELETE request untuk batal checkout
  const resBatal = http.request('DELETE', urlBatal, payloadBatal, params);

  check(resBatal, { 'batal status is 200': (r) => r.status === 200 });
  console.log('Batal Checkout Response:', resBatal.body);

  sleep(0.4)
}
