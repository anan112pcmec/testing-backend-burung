// k6 run diskon/tambah_diskon.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1, // jumlah virtual user
  duration: "5s", // lama pengujian
};

// TambahDiskonProduk: 

// Skema Benar:	Menyertakan Identitas Seller
// 		Nama lebih dari 5 karakter
// 		DiskonPersen harus lebih besar dari 0 dan lebih kecil sama dari 100
// 		BerlakuMulai Harus Lebih Kecil Dari Berlaku Sampai

// Skema Salah:	Tidak Menyertakan Identitas Seller 
// 		Nama Tidak Sampai 5 karakter
// 		DiskonPersen lebih kecil dari 0 atau lebih besar dari 100
// 		BerlakuMulai Lebih besar dari berlaku sampai

// skemabenar: *, skemasalah: *,


export default function () {
  const url = "http://localhost:8080/seller/diskon/tambah-diskon";


  const payloadBenar = JSON.stringify({
     identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    nama: "Diskon Musim Panas",
    deksripsi: "Potongan harga besar untuk semua produk burung hias.",
    diskon_persen: 20,
    berlaku_mulai: "2025-11-13T00:00:00Z",
    berlaku_sampai: "2025-12-13T00:00:00Z"
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com"
    },
    nama: "ucd",
    deskripsi: "Potongan Harga Bla bla bla",
    diskon_persen: 201,
    berlaku_mulai: "2025-11-13T00:00:00Z",
    berlaku_sampai: "2025-12-13T00:00:00Z"
  })

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

   const resBenar = http.patch(url, payloadBenar, params);
    const resSalah = http.patch(url, payloadSalah, params);
  
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
