// k6 run transaction/approve_order.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    iterations: 1,
};

// ApproveOrderTransaksi:

// Skema Benar: 	Menyertakan Identitas Seller
// 		IdTransaksi Tak boleh lebih kecil atau sama dengan 0
// 		AutoPengiriman Tak Boleh Waktu Lampau

// Skema Salah: 	Tidak Menyertakan Identitas Seller
// 		IdTransaksi lebih kecil atau sama dengan 0
// 		AutoPengiriman WaktuYangLampau


export default function () {
    const url = 'http://localhost:8080/seller/transaction/approve-order';

    // bikin tanggal sekarang tapi jam 12:00
    const now = new Date();
    now.setHours(12, 0, 0, 0); // jam 12:00:00
    const waktuAuto = now.toISOString(); 

    const payloadBenar = JSON.stringify({
        identitas_seller: {
            id_seller: 1,
            username_seller: 'ananapparel',
            email_seller: 'anan29837@gmail.com',
        },
        id_transaksi: 9,
        catatan_approve: "Pesanan disetujui",
        auto_pengiriman: false,
        waktu_auto_pengiriman: waktuAuto
    });

    const payloadSalah = JSON.stringify({
        identitas_seller: {
            id_seller: 1,
            username_seller: 'ananapparel',
            email_seller: 'anan29837@gmail.com',
        },
        id_transaksi: -9, // Salah IdTransaksi lebih kecil dari 0
        catatan_approve: "Pesanan disetujui",
        auto_pengiriman: false,
        waktu_auto_pengiriman: waktuAuto
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
