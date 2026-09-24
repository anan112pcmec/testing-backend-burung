// k6 run jenis/ajukan_data_brand.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// MasukanDataBrand:

// Skema Benar:	Menyertakan IdentitasSeller
// 		NamaPerushaaan Tak boleh kosong
// 		Negara Asal tak boleh kosong dan valid
// 		LembagaPendaftaran tak boleh kosong dan valid berdasarkan opsi DJKI Dst
// 		NomorPendaftaranMerek Tak Boleh Kosong
// 		SertifikatMerekUrl Boleh Kosong
// 		DokumenPerwakilanUrl tak boleh kosong
// 		NIB harus berisikan pas 13 hanya angka
// 		NPWP harus berisikan 15-16 digit hanya angka

// SkemaSalah: 	Tidak Menyertakan IdentitasSeller
// 		NamaPerusahaan Kosong
// 		Negara Asal kosong atau tak valid
// 		LembagaPendaftaran Kosong Atau tak valid
// 		NomorPendaftaranMerekUrl Kosong
// 		DokumenPerwakilanUrl Kosong
// 		NIB tak berisikan pas 13 digit angka
// 		NPWP tak berisikan pas 15-16 digit angka


export default function () {
  const url = "http://localhost:8080/seller/jenis/ajukan-data-brand";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama_perusahaan: "PT Burung Nusantara",
    negara_asal: "Indonesia",
    lembaga_pendaftaran: "Direktorat Jenderal Kekayaan Intelektual",
    nomor_pendaftaran_merek: "IDM-1234567890",
    sertifikat_merek_url: "https://example.com/sertifikat.pdf",
    dokumen_perwakilan_url: "https://example.com/dokumen_perwakilan.pdf",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    alasan: "Memenuhi syarat untuk mendaftarkan merek produk burung hias.",
  });

  const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    nama_perusahaan: "", // Salah Nama Perusahaan kosong
    negara_asal: "bhap", // Salah negara asal gak valid
    lembaga_pendaftaran: "Direktorat Jenderal Kekayaan Intelektual",
    nomor_pendaftaran_merek: "IDM-1234567890",
    sertifikat_merek_url: "https://example.com/sertifikat.pdf",
    dokumen_perwakilan_url: "https://example.com/dokumen_perwakilan.pdf",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    alasan: "Memenuhi syarat untuk mendaftarkan merek produk burung hias.",
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
