// k6 run jenis/edit_data_distributor.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// EditDataDistributor:

// Skema Benar: 	Menyertakan IdentitasSeller
// 		IdDistributorData harus lebih besar dari 0
// 		Nama Perusahaan Tak boleh Kosong
// 		NIB harus berisikan 13 Digit 
// 		NPWP harus berisikan 15-16 digit
// 		DokumenIzinDistributor tak boleh kosong urlnya
		

// Skema Salah:	Tidak Menyertakan IdentitasSeller
// 		IdDistributorData lebih kecil dari 0 atau 0
// 		Nama Perusahaan Kosong
// 		NIB tak berisikan pas 13 hanya angka
// 		NPWP Lebih atau kurang dari 15-16 digit
// 		DokumenIzinDistributor Kosong urlnya


export default function () {
  const url = "http://localhost:8080/seller/jenis/edit-data-distributor";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_distributor: 2, // ganti sesuai ID data distributor yang ingin diedit
    nama_perusahaan: "PT Burung Nusantara Updated",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    dokumen_izi_distributor_url: "https://example.com/dokumen_updated.pdf",
    alasan: "Memperbarui data distributor sesuai perubahan terbaru.",
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_distributor: -2, // salah id kurang dari 0
    nama_perusahaan: "PT Burung Nusantara Updated",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    dokumen_izi_distributor_url: "https://example.com/dokumen_updated.pdf",
    alasan: "Memperbarui data distributor sesuai perubahan terbaru.",
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
