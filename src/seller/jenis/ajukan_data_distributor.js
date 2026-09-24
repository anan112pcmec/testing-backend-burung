// k6 run jenis/ajukan_data_distributor.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// MasukanDataDistributor

// Skema Benar: 	Menyertakan IdentitasSeller
// 		Nama Perusahaan Tak boleh Kosong
// 		NIB harus berisikan 13 Digit hanya angka
// 		NPWP harus berisikan 15-16 digit
// 		DokumenIzinDistributor tak boleh kosong urlnya atau tak valid

// Skema Salah:	Tidak Menyertakan IdentitasSeller
// 		Nama Perusahaan Kosong
// 		NIB tak berisikan pas 13 digit hanya angka
// 		NPWP Lebih atau kurang dari 15-16 digit
// 		DokumenIzinDistributor Kosong urlnya


export default function () {
  const url = "http://localhost:8080/seller/jenis/ajukan-data-distributor";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama_perusahaan: "PT Burung Nusantara",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    dokumen_izi_distributor_url: "https://example.com/dokumen.pdf",
    alasan: "Memenuhi syarat menjadi distributor resmi produk burung hias.",
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama_perusahaan: "", // Salah Nama Perusahaan Kosong
    kode_nib: "8172927", // Salah kurang dari 13 angka digit
    kode_npwp: "12.345.678.9-012.", // Salah saat di clean kurang dari 15-16 angka digit
    dokumen_izi_distributor_url: "ugbcwq98gbswoubb.com", // salah url tak valid
    alasan: "Memenuhi syarat menjadi distributor resmi produk burung hias.",
  });

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
