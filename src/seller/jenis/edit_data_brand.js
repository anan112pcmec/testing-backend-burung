// k6 run jenis/edit_data_brand.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

// EditDataBrand:
	
// Skema Benar:	Menyertakan IdentitasSeller
// 		IdDataBrand lebih besar dari 0
// 		NamaPerushaaan Tak boleh kosong
// 		Negara Asal tak boleh kosong dan valid
// 		LembagaPendaftaran tak boleh kosong dan valid berdasarkan opsi DJKI Dst
// 		NomorPendaftaranMerek Tak Boleh Kosong
// 		SertifikatMerekUrl Boleh Kosong
// 		DokumenPerwakilanUrl tak boleh kosong
// 		NIB harus berisikan pas 13 hanya angka
// 		NPWP harus berisikan 15-16 digit hanya angka

// Skema Salah:	Tidak Menyertakan IdentitasSeller
// 		IdDataBrand Lebih kecil dari 0
// 		NamaPerusahaan Kosong
// 		Negara Asal kosong atau tak valid
// 		LembagaPendaftaran Kosong Atau tak valid
// 		NomorPendaftaranMerekUrl Kosong
// 		DokumenPerwakilanUrl Kosong
// 		NIB tak berisikan pas 13 digit angka
// 		NPWP tak berisikan pas 15-16 digit angka


export default function () {
  const url = "http://localhost:8080/seller/jenis/edit-data-brand";

  const payloadBenar = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_brand: 1, // ganti sesuai ID data brand yang ingin diedit
    nama_perusahaan: "PT Burung Nusantara Updated",
    negara_asal: "Indonesia",
    lembaga_pendaftaran: "Direktorat Jenderal Kekayaan Intelektual",
    nomor_pendaftaran_merek: "IDM-9876543210",
    sertifikat_merek_url: "https://example.com/sertifikat_updated.pdf",
    dokumen_perwakilan_url: "https://example.com/dokumen_perwakilan_updated.pdf",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    alasan: "Memperbarui data brand sesuai perubahan terbaru.",
  });

   const payloadSalah = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_brand: -1, // Salah Id data brand kurang dari 0
    nama_perusahaan: "PT Burung Nusantara Updated",
    negara_asal: "Indonesia",
    lembaga_pendaftaran: "Direktorat Jenderal Kekayaan Intelektual",
    nomor_pendaftaran_merek: "IDM-9876543210",
    sertifikat_merek_url: "https://example.com/sertifikat_updated.pdf",
    dokumen_perwakilan_url: "https://example.com/dokumen_perwakilan_updated.pdf",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    alasan: "Memperbarui data brand sesuai perubahan terbaru.",
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
