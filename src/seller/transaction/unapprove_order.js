// k6 run transaction/unapprove_order.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // jumlah virtual users
    iterations: 1,
};

// UnApproveOrderSeller:

// Skema Benar: 	Menyertakan IdentitasSeller
// 		IdTransaksi Tak boleh lebih kecil atau sama dengan 0

// Skema Salah:	Tidak Menyertakan IdentitasSeller
// 		IdTransaksi lebih kecil atau sama dengan 0


export default function () {
    const url = 'http://localhost:8080/seller/transaction/unapprove-order'; // ganti sesuai base URL backend kamu
    const payloadBenar = JSON.stringify({
        identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
        id_transaksi: 4,
        catatan_unapprove: "Pesanan dibatalkan karena stok habis"
    });

    const payloadSalah = JSON.stringify({
        identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
        id_transaksi: -4, // Salah IdTransaksi Lebih kecil dari 0
        catatan_unapprove: "Pesanan dibatalkan karena stok habis"
    });

    
          let params = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        
          // Catatan: Pada k6, method http.del mendukung body jika dikirim melalui objek params.
          const resBenar = http.del(url, payloadBenar, params);
          const resSalah = http.del(url, payloadSalah, params);
        
          check(resBenar, {
            "skema benar status 200": (r) => r.status === 200,
          });
        
          check(resSalah, {
            "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
          });
        
          try {
            console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
            console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
          } catch {
            console.log("Respon Benar: ", resBenar.body);
            console.log("Respon Salah: ", resSalah.body);
          }

}
