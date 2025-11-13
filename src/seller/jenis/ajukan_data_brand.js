// k6 run jenis/ajukan_data_brand.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
};

export default function () {
  const url = "http://localhost:8080/seller/jenis/ajukan-data-brand";

  const payload = JSON.stringify({
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

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

}
