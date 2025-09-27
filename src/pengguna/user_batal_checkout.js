import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const urlBatal = 'http://localhost:8080/user/transaksi/batal-checkout-barang';

  const payloadBatal = JSON.stringify({
   
      pesan_chekout_barang: "Berhasil",
      data_response_checkout_barang: [
        {
          id_barang_induk_keranjang: 73,
          id_kategori_barang_keranjang: 76,
          nama_barang_keranjang: "Baju Renang Anak Perempuan",
          nama_kategori_barang_keranjang: "Pink",
          dipesan_barang_keranjang: 20,
          status_barang_keranjang: true,
          pesan_data_keranjang: "Berhasil Siap Transaksi"
        }
      ]
    
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // === Kirim DELETE ===
  const resBatal = http.del(urlBatal, payloadBatal, params);

  check(resBatal, {
    'batal status is 200': (r) => r.status === 200,
    'response has body': (r) => r.body && r.body.length > 0,
  });

  try {
    let dataBatal = JSON.parse(resBatal.body);
    console.log('🚫 Batal Checkout Response:', JSON.stringify(dataBatal, null, 2));
  } catch (e) {
    console.log('⚠️ Gagal parse JSON batal:', e);
    console.log('Raw body:', resBatal.body);
  }

}
