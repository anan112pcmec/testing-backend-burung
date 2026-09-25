// k6 run transaction/rating_pengiriman_kurir.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    iterations: 1,
};

// RatingPengirimanKurir:
// Skema Benar: 
//       Menyertakan IdentitasSeller
//       IdPengiriman > 0
//       IdKurir > 0
//       Rating range 1 - 5

// Skema Salah: 
//       Tidak Menyertakan IdentitasSeller (dikosongkan / dihilangkan)
//       IdPengiriman <= 0
//       IdKurir <= 0
//       Rating di luar range 1 - 5 (misal: 6 atau 0)

export default function () {
    const url = 'http://localhost:8080/seller/transaction/seller-rating-pengiriman-kurir';

    const payloadBenar = JSON.stringify({
        identitas_seller: {
            id_seller: 1,
            username_seller: 'ananapparel',
            email_seller: 'anan29837@gmail.com',
        },
        id_pengiriman: 101,
        id_kurir: 15,
        ulasan: 'Kurir ramah, pengiriman cepat dan barang aman sampai tujuan.',
        rating: 5
    });

    const payloadSalah = JSON.stringify({
        identitas_seller: {}, // Tidak menyertakan IdentitasSeller dengan benar
        id_pengiriman: -1,    // Salah: IdPengiriman <= 0
        id_kurir: 0,          // Salah: IdKurir <= 0
        ulasan: 'Kurir kurang responsif.',
        rating: 6             // Salah: Rating di luar range 1 - 5
    });

    let params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Menggunakan metode POST (atau sesuaikan dengan method endpoint backend Anda, misal: http.post / http.put / http.del)
    // Asumsi untuk rating pengiriman menggunakan POST, jika berbeda silakan disesuaikan (misal: http.post)
    const resBenar = http.post(url, payloadBenar, params);
    const resSalah = http.post(url, payloadSalah, params);

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